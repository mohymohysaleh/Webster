import React, { useState } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import { useMusic } from '../context/MusicContext';
import { BsPlayFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import './SongCard.css';

const SongCard = ({ song, index }) => {
  const { toggleLike, isLiked } = usePlaylist();
  const { playSongById } = useMusic();
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!isLiking) {
      try {
        setIsLiking(true);
        await toggleLike(song);
      } finally {
        setIsLiking(false);
      }
    }
  };

  const handlePlay = () => {
    playSongById(song._id);
  };

  return (
    <div className="song-card">
      <div className="song-card-left">
        <div className="song-number">{index + 1}</div>
        <button className="play-button" onClick={handlePlay}>
          <BsPlayFill />
        </button>
        <img 
          src={song.image || "/placeholder.svg"} 
          alt={song.name} 
          className="song-image" 
        />
        <div className="song-info">
          <div className="song-name">{song.name}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
      </div>
      <div className="song-card-right">
        <div className="song-album">{song.album}</div>
        <div className="song-duration">{song.duration}</div>
        <button 
          className={`like-button ${isLiked(song._id) ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          {isLiked(song._id) ? (
            <BsHeartFill className="heart-icon filled" />
          ) : (
            <BsHeart className="heart-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SongCard; 