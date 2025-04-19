import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPlaylists();
      fetchLikedSongs();
    }
  }, [user]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/playlists/my-playlists', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/playlists/liked-songs', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setLikedSongs(data);
      }
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };

  const createPlaylist = async (name, description) => {
    try {
      const response = await fetch('http://localhost:8000/api/playlists/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, description, isPublic: true })
      });
      if (response.ok) {
        const newPlaylist = await response.json();
        setPlaylists(prev => [...prev, newPlaylist]);
        return newPlaylist;
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addToPlaylist = async (playlistId, songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}/add-song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ songId })
      });
      if (response.ok) {
        const updatedPlaylist = await response.json();
        setPlaylists(prev => 
          prev.map(playlist => 
            playlist._id === playlistId ? updatedPlaylist : playlist
          )
        );
      }
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };

  const removeFromPlaylist = async (playlistId, songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}/remove-song/${songId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        const updatedPlaylist = await response.json();
        setPlaylists(prev => 
          prev.map(playlist => 
            playlist._id === playlistId ? updatedPlaylist : playlist
          )
        );
      }
    } catch (error) {
      console.error('Error removing from playlist:', error);
    }
  };

  const toggleLike = async (songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/toggle-like/${songId}`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        const { likedSongs: updatedLikes } = await response.json();
        setLikedSongs(updatedLikes);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <PlaylistContext.Provider value={{
      playlists,
      likedSongs,
      createPlaylist,
      addToPlaylist,
      removeFromPlaylist,
      toggleLike,
      fetchPlaylists,
      fetchLikedSongs
    }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
}; 