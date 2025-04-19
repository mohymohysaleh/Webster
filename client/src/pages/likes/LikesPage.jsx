"use client"

import { useEffect, useState } from 'react';
import { usePlaylist } from '../../contexts/PlaylistContext';
import { useMusic } from '../../context/MusicContext';
import { BsHeart, BsHeartFill, BsPlayFill } from 'react-icons/bs';
import './LikesPage.css';

const LikesPage = () => {
  const { likedSongs, toggleLike, fetchLikedSongs, isLiked } = usePlaylist();
  const { playSongById } = useMusic();
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  const handleLike = async (song) => {
    if (!isLiking) {
      try {
        setIsLiking(true);
        await toggleLike(song);
      } finally {
        setIsLiking(false);
      }
    }
  };

  const handlePlay = (songId) => {
    playSongById(songId);
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
      <div className="likes-header">
        <div className="likes-header-content">
          <div className="likes-icon-container">
            <BsHeartFill size={40} color="#1db954" />
          </div>
          <div className="likes-title-container">
            <h1 className="likes-title">Liked Songs</h1>
            <div className="user-info">
              <span className="song-count">{likedSongs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="likes-content">
        <table className="song-table">
          <thead>
            <tr>
              <th className="song-number">#</th>
              <th className="song-title">TITLE</th>
              <th className="song-album">ALBUM</th>
              <th className="song-duration">⏱️</th>
              <th className="song-actions"></th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index) => (
              <tr key={song._id} className="song-row">
                <td className="song-number">
                  <span className="number">{index + 1}</span>
                  <button 
                    className="play-button"
                    onClick={() => handlePlay(song._id)}
                  >
                    <BsPlayFill  />
                  </button>
                </td>
                <td className="song-title">
                  <div className="song-info">
                    <div className="song-image">
                      <img src={song.image || "/placeholder.svg"} alt={song.name} />
                    </div>
                    <div className="song-details">
                      <div className="song-name">{song.name}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="song-album">{song.album}</td>
                <td className="song-duration">{song.duration}</td>
                <td className="song-actions">
                  <button
                    className="like-button"
                    onClick={() => handleLike(song)}
                    disabled={isLiking}
                  >
                    <BsHeartFill className="heart-icon filled" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LikesPage;
