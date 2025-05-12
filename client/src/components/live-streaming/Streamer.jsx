// client/src/components/live-stream/Streamer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import './LiveStream.css';

const SIGNALING_SERVER_URL = 'http://localhost:3000';

const Streamer = ({ onBack }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamId, setStreamId] = useState('');
  const [listeners, setListeners] = useState(0);
  const [error, setError] = useState(null);
  const socketRef = useRef();
  const peersRef = useRef({});
  const mediaStreamRef = useRef();

  useEffect(() => {
    socketRef.current = io(SIGNALING_SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError('Failed to connect to signaling server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startStreaming = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;
      
      const id = Math.random().toString(36).substring(2, 9);
      setStreamId(id);
      socketRef.current.emit('room:join', id);
      setIsStreaming(true);

      socketRef.current.on('room:listener-joined', (listenerId) => {
        console.log('Listener joined:', listenerId);
        
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStreamRef.current,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' },
            ],
          },
        });

        peer.on('signal', (signal) => {
          console.log('Sending signal to listener:', listenerId);
          socketRef.current.emit('peer:signal', listenerId, signal);
        });

        peer.on('stream', (stream) => {
          console.log('Stream received (this should not happen for streamer)');
        });

        peer.on('connect', () => {
          console.log('Peer connection established with listener:', listenerId);
        });

        peer.on('error', (err) => {
          console.error('Peer error:', err);
          removePeer(listenerId);
        });

        peer.on('close', () => {
          console.log('Peer connection closed:', listenerId);
          removePeer(listenerId);
        });

        peersRef.current[listenerId] = peer;
        setListeners(Object.keys(peersRef.current).length);
      });

      socketRef.current.on('peer:signal', (listenerId, signal) => {
        console.log('Received signal from listener:', listenerId);
        const peer = peersRef.current[listenerId];
        if (peer && !peer.destroyed) {
          peer.signal(signal);
        }
      });

    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    setStreamId('');
    socketRef.current.emit('leave-room', streamId);
    
    Object.values(peersRef.current).forEach(peer => {
      if (!peer.destroyed) peer.destroy();
    });
    peersRef.current = {};
    setListeners(0);
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    onBack();
  };

  const removePeer = (listenerId) => {
    if (peersRef.current[listenerId]) {
      if (!peersRef.current[listenerId].destroyed) {
        peersRef.current[listenerId].destroy();
      }
      delete peersRef.current[listenerId];
      setListeners(Object.keys(peersRef.current).length);
    }
  };

  return (
    <div className="streamer-view">
      <h2>Audio Streamer</h2>
      {error && <div className="error-message">{error}</div>}
      
      {!isStreaming ? (
        <button className="streamer-btn" onClick={startStreaming}>
          Start Streaming
        </button>
      ) : (
        <>
          <div className="stream-info">
            <div className="stream-id-display">
              Stream ID: <strong>{streamId}</strong>
            </div>
            <div className="listeners-count">
              Listeners: {listeners}
            </div>
          </div>
          <button className="stop-btn" onClick={stopStreaming}>
            Stop Streaming
          </button>
        </>
      )}
    </div>
  );
};

export default Streamer;