"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { useMusic } from "../../context/MusicContext"
import "./LikesPage.css"

export default function LikesPage() {
  const [likedSongs, setLikedSongs] = useState([])
  const { songs, playSong } = useMusic()

  useEffect(() => {
    // Get 8 random songs from the database to simulate liked songs
    if (songs.length > 0) {
      const shuffled = [...songs].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 8)
      setLikedSongs(selected)
    }
  }, [songs])

  const handleSongClick = (song) => {
    // Find the index of this song in the main songs array
    const songIndex = songs.findIndex((s) => s._id === song._id)

    if (songIndex !== -1) {
      playSong(songIndex)
    }
  }

  return (
    <div className="likes-page">
      {/* Header with gradient background */}
      <div className="likes-header">
        <div className="likes-header-content">
          <div className="likes-icon-container">
            <Heart size={64} className="text-white" />
          </div>
          <div className="likes-title-container">
            <h1 className="likes-title">Liked Songs</h1>
            <div className="user-info">
              <div className="profile-image">
                <img src="/placeholder.svg?height=24&width=24" alt="Profile" />
              </div>
              <span className="username">KareemAdel</span>
              <span className="song-count">• {likedSongs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="likes-content">
        <table className="song-table">
          <thead>
            <tr>
              <th className="song-number">#</th>
              <th className="song-title">TITLE</th>
              <th className="song-album">ALBUM</th>
              <th className="song-date">DATE ADDED</th>
              <th className="song-duration">⏱️</th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index) => (
              <tr key={song._id || index} className="song-row" onClick={() => handleSongClick(song)}>
                <td className="song-number">{index + 1}</td>
                <td className="song-title">
                  <div className="song-info">
                    <div className="song-image">
                      <img src={song.image || "/placeholder.svg?height=40&width=40"} alt={song.name} />
                    </div>
                    <div className="song-details">
                      <div className="song-name">{song.name}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="song-album">{song.album}</td>
                <td className="song-date">Today</td>
                <td className="song-duration">{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
