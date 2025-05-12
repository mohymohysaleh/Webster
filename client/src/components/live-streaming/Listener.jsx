// client/src/components/live-stream/Listener.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import './liveStream.css';

const SIGNALING_SERVER_URL = process.env.VITE_API_URL || 'https://webster-production.up.railway.app';

const Listener = ({ onBack }) => {
  const [isListening, setIsListening] = useState(false);
  const [streamId, setStreamId] = useState('');
  const [status, setStatus] = useState('disconnected');
  const socketRef = useRef();
  const peerRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    socketRef.current = io(SIGNALING_SERVER_URL);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startListening = () => {
    if (!streamId.trim()) return;
    
    socketRef.current.emit('room:join', streamId);
    setIsListening(true);
    setStatus('connecting...');

    socketRef.current.once('room:streamer-connected', (streamerId) => {
      setStatus('establishing connection...');
      
      const peer = new Peer({ 
        initiator: false, 
        trickle: false 
      });

      peer.on('signal', (signal) => {
        socketRef.current.emit('peer:signal', streamerId, signal);
      });

      peer.on('stream', (stream) => {
        audioRef.current.srcObject = stream;
        audioRef.current.play()
          .then(() => setStatus('connected'))
          .catch(err => {
            console.error('Audio playback failed:', err);
            setStatus('playback error');
          });
      });

      peer.on('error', (err) => {
        console.error('Peer error:', err);
        setStatus('connection error');
        stopListening();
      });

      peerRef.current = peer;
    });

    socketRef.current.on('peer:signal', (senderId, signal) => {
      if (peerRef.current && !peerRef.current.destroyed) {
        peerRef.current.signal(signal);
      }
    });

    socketRef.current.on('streamer-disconnected', () => {
      setStatus('streamer disconnected');
      stopListening();
    });
  };

  const stopListening = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (audioRef.current.srcObject) {
      audioRef.current.srcObject.getTracks().forEach(track => track.stop());
      audioRef.current.srcObject = null;
    }
    socketRef.current.emit('leave-room', streamId);
    setIsListening(false);
    setStatus('disconnected');
    onBack();
  };

  return (
    <div className="listener-view">
      <h2>Audio Listener</h2>
      
      {!isListening ? (
        <>
          <input
            type="text"
            value={streamId}
            onChange={(e) => setStreamId(e.target.value)}
            placeholder="Enter Stream ID"
            className="stream-id-input"
          />
          <button 
            className="listener-btn" 
            onClick={startListening}
            disabled={!streamId.trim()}
          >
            Connect to Stream
          </button>
        </>
      ) : (
        <>
          <div className="status">Status: {status}</div>
          <audio ref={audioRef} controls autoPlay className="audio-player" />
          <button className="stop-btn" onClick={stopListening}>
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default Listener;