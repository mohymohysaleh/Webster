// client/src/components/live-stream/Listener.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import './LiveStream.css';

const SIGNALING_SERVER_URL = 'http://localhost:3000';

const Listener = ({ onBack }) => {
  const [isListening, setIsListening] = useState(false);
  const [streamId, setStreamId] = useState('');
  const [status, setStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const socketRef = useRef();
  const peerRef = useRef();
  const audioRef = useRef();

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

  const startListening = () => {
    if (!streamId.trim()) return;
    
    setError(null);
    setStatus('connecting...');
    socketRef.current.emit('room:join', streamId);
    setIsListening(true);

    socketRef.current.once('room:streamer-connected', (streamerId) => {
      console.log('Connected to streamer:', streamerId);
      setStatus('establishing connection...');
      
      const peer = new Peer({ 
        initiator: false, 
        trickle: false,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
          ],
        },
      });

      peer.on('signal', (signal) => {
        console.log('Sending signal to streamer:', streamerId);
        socketRef.current.emit('peer:signal', streamerId, signal);
      });

      peer.on('stream', (stream) => {
        console.log('Stream received from streamer');
        audioRef.current.srcObject = stream;
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setStatus('connected');
              console.log('Audio playback started');
            })
            .catch(err => {
              console.error('Audio playback failed:', err);
              setStatus('click to play');
              audioRef.current.controls = true;
            });
        }
      });

      peer.on('connect', () => {
        console.log('Peer connection established with streamer');
      });

      peer.on('error', (err) => {
        console.error('Peer error:', err);
        setError('Connection error: ' + err.message);
        setStatus('connection failed');
        stopListening();
      });

      peer.on('close', () => {
        console.log('Peer connection closed');
        setStatus('disconnected');
      });

      peerRef.current = peer;
    });

    socketRef.current.on('peer:signal', (senderId, signal) => {
      console.log('Received signal from streamer:', senderId);
      if (peerRef.current && !peerRef.current.destroyed) {
        peerRef.current.signal(signal);
      }
    });

    socketRef.current.on('streamer-disconnected', () => {
      console.log('Streamer disconnected');
      setStatus('streamer disconnected');
      stopListening();
    });
  };

  const stopListening = () => {
    if (peerRef.current && !peerRef.current.destroyed) {
      peerRef.current.destroy();
    }
    peerRef.current = null;
    
    if (audioRef.current.srcObject) {
      audioRef.current.srcObject.getTracks().forEach(track => track.stop());
      audioRef.current.srcObject = null;
    }
    
    socketRef.current.emit('leave-room', streamId);
    setIsListening(false);
    setStatus('disconnected');
    onBack();
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setStatus('connected'))
        .catch(err => {
          console.error('Manual playback failed:', err);
          setError('Could not play audio: ' + err.message);
        });
    }
  };

  return (
    <div className="listener-view">
      <h2>Audio Listener</h2>
      {error && <div className="error-message">{error}</div>}
      
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
          <audio 
            ref={audioRef} 
            controls 
            className="audio-player" 
            onPlay={() => setStatus('connected')}
          />
          {status === 'click to play' && (
            <button className="play-btn" onClick={handlePlayAudio}>
              Play Audio
            </button>
          )}
          <button className="stop-btn" onClick={stopListening}>
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default Listener;