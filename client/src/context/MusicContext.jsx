"use client"

import { createContext, useState, useContext, useEffect } from "react"

const MusicContext = createContext()

export function MusicProvider({ children }) {
  const [songs, setSongs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/music/db")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching music:", err))
  }, [])

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
