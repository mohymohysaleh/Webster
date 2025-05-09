import { useState } from 'react';
import { usePlaylist } from '../../../contexts/PlaylistContext';
import './AddToPlaylistModal.css';

export function AddToPlaylistModal({ isOpen, onClose, song, onSongAdded }) {
  const { playlists, addToPlaylist } = usePlaylist();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToPlaylist = async (playlistId) => {
    if (!song || !song._id) return;
    try {
      setIsLoading(true);
      await addToPlaylist(playlistId, song._id);
      if (onSongAdded) onSongAdded(playlistId);
      onClose();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add to Playlist</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {playlists.length === 0 ? (
            <p className="text-center text-secondary">You don't have any playlists yet</p>
          ) : (
            <div className="playlist-list">
              {playlists.map(playlist => (
                <div 
                  key={playlist._id} 
                  className="playlist-item"
                  onClick={() => handleAddToPlaylist(playlist._id)}
                >
                  <div className="playlist-item-image">
                    <img src={playlist.coverImage || "/placeholder.svg"} alt={playlist.name} />
                  </div>
                  <div className="playlist-item-info">
                    <div className="playlist-item-name">{playlist.name}</div>
                    <div className="playlist-item-songs">
                      {playlist.songs?.length || 0} songs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 