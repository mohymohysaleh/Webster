// client/src/components/live-stream/LiveStream.jsx
import React, { useState } from 'react';
import Streamer from './Streamer.jsx';
import Listener from './Listener.jsx';

import './liveStream.css';

const LiveStream = () => {
  const [role, setRole] = useState(null);

  return (
    <div className="live-stream-container">
      {!role ? (
        <div className="role-selection">
          <h1>Live Audio Streaming</h1>
          <div className="role-buttons">
            <button 
              className="streamer-btn" 
              onClick={() => setRole('streamer')}
            >
              Start Streaming
            </button>
            <button 
              className="listener-btn" 
              onClick={() => setRole('listener')}
            >
              Join Stream
            </button>
          </div>
        </div>
      ) : role === 'streamer' ? (
        <Streamer onBack={() => setRole(null)} />
      ) : (
        <Listener onBack={() => setRole(null)} />
      )}
    </div>
  );
};

export default LiveStream;