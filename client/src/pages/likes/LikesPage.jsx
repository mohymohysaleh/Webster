"use client"

import { useEffect } from 'react';
import { usePlaylist } from '../../contexts/PlaylistContext';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import './LikesPage.css';

const LikesPage = () => {
  const { likedSongs, toggleLike, fetchLikedSongs } = usePlaylist();

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  const handleLike = async (songId) => {
    await toggleLike(songId);
  };

  if (!likedSongs || likedSongs.length === 0) {
    return (
      <div className="likes-empty-state">
        <BsHeart className="empty-heart-icon" />
        <h2>You have no liked songs</h2>
        <p>Start liking songs to build your collection</p>
      </div>
    );
  }

  return (
    <div className="likes-page">
      <h1>Liked Songs</h1>
      <div className="songs-list">
        {likedSongs.map((song) => (
          <div key={song._id} className="song-item">
            <img src={song.image} alt={song.name} className="song-image" />
            <div className="song-info">
              <h3>{song.name}</h3>
              <p>{song.artist}</p>
            </div>
            <button
              className="like-button"
              onClick={() => handleLike(song._id)}
            >
              <BsHeartFill className="heart-icon filled" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikesPage;
