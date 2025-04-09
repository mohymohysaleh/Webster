import React from 'react';
import './playlist.css';

const Playlist = ({ songs }) => {
  return (
    <div className="song-list">
      <div className="song-list-header">
        <span className="header-number">#</span>
        <span className="header-title">TITLE</span>
        <span className="header-album">ALBUM</span>
        <span className="header-date">DATE ADDED</span>
        <span className="header-likes"></span>
      </div>
      
      {songs.map((song) => (
        <div className="song-item" key={song.id}>
          <span className="song-number">{song.id}</span>
          <div className="song-info">
            <span className="song-title">{song.title}</span>
            <span className="song-artist">{song.artist}</span>
          </div>
          <span className="song-album">{song.album}</span>
          <span className="song-date">{song.date}</span>
          <span className="song-likes">{song.likes}</span>
        </div>
      ))}
    </div>
  );
};

export default Playlist;