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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      setPlaylists(data);
      return data;
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/playlists/liked-songs-direct', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      console.log('Fetched liked songs:', data);
      setLikedSongs(data);
      return data;
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
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const newPlaylist = await response.json();
      setPlaylists(prev => [...prev, newPlaylist]);
      return newPlaylist;
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
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const updatedPlaylist = await response.json();
      setPlaylists(prev => 
        prev.map(playlist => 
          playlist._id === playlistId ? updatedPlaylist : playlist
        )
      );
      return updatedPlaylist;
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };

  const removeFromPlaylist = async (playlistId, songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}/remove-song/${songId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const updatedPlaylist = await response.json();
      setPlaylists(prev => 
        prev.map(playlist => 
          playlist._id === playlistId ? updatedPlaylist : playlist
        )
      );
      return updatedPlaylist;
    } catch (error) {
      console.error('Error removing from playlist:', error);
    }
  };

  const toggleLike = async (song) => {
    if (!song || !song._id) {
      console.error('Invalid song object:', song);
      return;
    }

    // Optimistic update
    const isSongLiked = likedSongs.some(s => s._id === song._id);
    const optimisticLikedSongs = isSongLiked
      ? likedSongs.filter(s => s._id !== song._id)
      : [...likedSongs, song];
    
    setLikedSongs(optimisticLikedSongs);

    try {
      console.log('Toggling like for song:', song._id);
      // Make the API call
      const response = await fetch(`http://localhost:8000/api/playlists/like-song/${song._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const updatedLikedSongs = await response.json();
      console.log('Updated liked songs:', updatedLikedSongs);
      setLikedSongs(updatedLikedSongs);
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      await fetchLikedSongs();
    }
  };

  const isLiked = (songId) => {
    return likedSongs.some(song => song._id === songId);
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
      fetchLikedSongs,
      isLiked
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