// src/components/player/MediaPlayer.jsx
import React from 'react';
import './mediaPlayer.css'; 
// import { PlayArrow, Pause, SkipPrevious, SkipNext, Shuffle, Repeat, VolumeUp } from '@mui/icons-material';
const MediaPlayer = () => {
    return (
      <div className="media-player">
        <div className="media-player-left">
          <i className="fas fa-heart like-icon"></i>
          <div className="media-player-details">
            <h3>Maak alby</h3>
            <p>Amr Diab</p>
          </div>
        </div>
  
        <div className="media-player-center">
          <div className="media-player-controls">
            <i className="fas fa-random"></i>
            <i className="fas fa-step-backward"></i>
            <i className="fas fa-play play-button"></i>
            <i className="fas fa-step-forward"></i>
            <i className="fas fa-repeat"></i>
          </div>
          <div className="media-player-progress">
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
          </div>
        </div>
  
        <div className="media-player-right">
          <i className="fas fa-volume-up"></i>
        </div>
      </div>
    );
  };
  
  export default MediaPlayer;