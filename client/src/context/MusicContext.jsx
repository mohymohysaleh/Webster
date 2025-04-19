"use client"

import { createContext, useState, useContext, useEffect } from "react"

const MusicContext = createContext()

export function MusicProvider({ children }) {
  const [songs, setSongs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchSongs().catch(error => console.error("Error fetching songs:", error));
  }, []);

  // Play a specific song by its index in the songs array
  const playSong = (index) => {
    setCurrentIndex(index)
    setIsPlaying(true)
  }

  // Play a song by finding it in the songs array
  const playSongById = (songId) => {
    const songIndex = songs.findIndex((song) => song._id === songId)
    if (songIndex !== -1) {
      playSong(songIndex)
    }
  }

  // Skip to next song
  const skipNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length)
    setIsPlaying(true)
  }

  // Skip to previous song
  const skipPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)
    setIsPlaying(true)
  }

  // Toggle play/pause
  const togglePlay = () => setIsPlaying(!isPlaying)

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/songs', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const data = await response.json();
      setSongs(data);
      return data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  };

  const addSong = async (songData) => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/songs', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(songData)
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const newSong = await response.json();
      setSongs(prev => [...prev, newSong]);
      return newSong;
    } catch (error) {
      console.error('Error adding song:', error);
      throw error;
    }
  };

  const deleteSong = async (songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/songs/${songId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setSongs(prev => prev.filter(song => song._id !== songId));
    } catch (error) {
      console.error('Error deleting song:', error);
      throw error;
    }
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        playSong,
        playSongById,
        skipNext,
        skipPrev,
        togglePlay,
        user,
        setUser,
        fetchSongs,
        addSong,
        deleteSong
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
