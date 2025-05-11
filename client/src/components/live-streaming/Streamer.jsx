// client/src/components/live-stream/Streamer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import './LiveStream.css';

const SIGNALING_SERVER_URL =  'http://localhost:3000';

const Streamer = ({ onBack }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamId, setStreamId] = useState('');
  const [listeners, setListeners] = useState(0);
  const socketRef = useRef();
  const peersRef = useRef({});
  const mediaStreamRef = useRef();

  useEffect(() => {
    socketRef.current = io(SIGNALING_SERVER_URL);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      const id = Math.random().toString(36).substring(2, 9);
      setStreamId(id);
      socketRef.current.emit('room:join', id);
      setIsStreaming(true);

      socketRef.current.on('room:listener-joined', (listenerId) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStreamRef.current,
        });

        peer.on('signal', (signal) => {
          socketRef.current.emit('peer:signal', listenerId, signal);
        });

        peer.on('error', (err) => {
          console.error('Peer error:', err);
          removePeer(listenerId);
        });

        peersRef.current[listenerId] = peer;
        setListeners(Object.keys(peersRef.current).length);
      });

      socketRef.current.on('peer:signal', (listenerId, signal) => {
        const peer = peersRef.current[listenerId];
        if (peer && !peer.destroyed) {
          peer.signal(signal);
        }
      });

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    setStreamId('');
    socketRef.current.emit('leave-room', streamId);
    Object.values(peersRef.current).forEach(peer => peer.destroy());
    peersRef.current = {};
    setListeners(0);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    onBack();
  };

  const removePeer = (listenerId) => {
    if (peersRef.current[listenerId]) {
      peersRef.current[listenerId].destroy();
      delete peersRef.current[listenerId];
      setListeners(Object.keys(peersRef.current).length);
    }
  };

  return (
    <div className="streamer-view">
      <h2>Audio Streamer</h2>
      
      {!isStreaming ? (
        <button className="streamer-btn" onClick={startStreaming}>
          Start Streaming
        </button>
      ) : (
        <>
          <div className="stream-id-display">
            Stream ID: <strong>{streamId}</strong>
          </div>
          <div>Listeners: {listeners}</div>
          <button className="stop-btn" onClick={stopStreaming}>
            Stop Streaming
          </button>
        </>
      )}
    </div>
  );
};

export default Streamer;