// client/src/LiveStream.jsx
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './LiveStream.css'; // Import the CSS file

const LiveStream = () => {
  const [streamId, setStreamId] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const socketRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io('http://localhost:5000');

    // Handle WebSocket events
    socketRef.current.on('room:listener-joined', (listenerId) => {
      console.log(`Listener joined: ${listenerId}`);
    });

    socketRef.current.on('room:streamer-connected', (streamerId) => {
      console.log(`Streamer connected: ${streamerId}`);
    });

    socketRef.current.on('peer:signal', (senderId, data) => {
      console.log(`Signal from ${senderId}:`, data);
      // Handle audio data and play it
      if (data.audio) {
        const audioBlob = new Blob([data.audio], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    });

    return () => {
      // Clean up WebSocket connection
      socketRef.current.disconnect();
    };
  }, []);

  const startStreaming = () => {
    if (streamId) {
      socketRef.current.emit('room:join', streamId);
      setIsStreaming(true);
    }
  };

  const stopStreaming = () => {
    if (isStreaming) {
      socketRef.current.emit('leave-room', streamId);
      setIsStreaming(false);
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  };

  return (
    <div className="live-stream-container">
      <h1>Live Audio Streaming</h1>
      <div className="input-group">
        <input
          type="text"
          value={streamId}
          onChange={(e) => setStreamId(e.target.value)}
          placeholder="Enter Stream ID"
        />
      </div>
      <div className="button-group">
        <button onClick={startStreaming} disabled={isStreaming}>
          Start Streaming
        </button>
        <button onClick={stopStreaming} disabled={!isStreaming}>
          Stop Streaming
        </button>
      </div>
      <div className="audio-player">
        <audio ref={audioRef} controls />
      </div>
    </div>
  );
};

export default LiveStream;
