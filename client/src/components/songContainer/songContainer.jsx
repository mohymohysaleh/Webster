import React from 'react';
import './songContainer.css';


const songs = [
  { id: 1, title: 'Play It Safe', artist: 'Julia Wolf', album: 'Play It Safe', duration: '2:12' },
  { id: 2, title: 'Ocean Front Apt.', artist: 'ayokay', album: 'In the Shape of a Dream', duration: '2:12' },
  { id: 3, title: 'Free Spirit', artist: 'Khalid', album: 'Free Spirit', duration: '3:02' },
  { id: 4, title: 'Remind You', artist: 'FRENSHIP', album: 'Vacation', duration: '4:25' },
  { id: 5, title: 'Same Old', artist: 'SHY Martin', album: 'Same Old', duration: '2:56' },
  { id: 6, title: 'Free Spirit', artist: 'Khalid', album: 'Free Spirit', duration: '3:02' },
  { id: 7, title: 'Remind You', artist: 'FRENSHIP', album: 'Vacation', duration: '4:25' },
  { id: 8, title: 'Same Old', artist: 'SHY Martin', album: 'Same Old', duration: '2:56' },
  { id: 9, title: 'Free Spirit', artist: 'Khalid', album: 'Free Spirit', duration: '3:02' },
  { id: 10, title: 'Remind You', artist: 'FRENSHIP', album: 'Vacation', duration: '4:25' },
  { id: 11, title: 'Same Old', artist: 'SHY Martin', album: 'Same Old', duration: '2:56' },
  { id: 12, title: 'Another Song', artist: 'Artist Name', album: 'Album Name', duration: '3:30' },
];

const SongContainer = () => {
  return (
    <div className="song-container">
      <div className="song-header">
        <span>#</span>
        <span>TITLE</span>
        <span>ALBUM</span>
        <span>DATE ADDED</span>
        <span>⏱️</span>
      </div>
      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} className="song-item">
            <span>{song.id}</span>
            <div className="song-info">
              <img src={`${song.title.toLowerCase().replace(' ', '-')}.jpg`} alt={song.title} className="song-cover" />
              <div className="song-details">
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
            <span>{song.album}</span>
            <span>#</span>
            <span>{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongContainer;
