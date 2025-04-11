"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useMusic } from "../../context/MusicContext"
import "./PlaylistDetailPage.css"

export default function PlaylistDetailPage() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [playlistSongs, setPlaylistSongs] = useState([])
  const { songs, playSong } = useMusic()

  useEffect(() => {
    // Define playlist metadata based on ID
    const getPlaylistInfo = () => {
      const playlistsInfo = {
        "chill-mix": {
          title: "Chill Mix",
          description: "Relaxing tunes to unwind",
          color: "#8c67ab",
          image: "/placeholder.svg?height=200&width=200",
        },
        "pop-mix": {
          title: "Pop Mix",
          description: "Today's top pop hits",
          color: "#e8115b",
          image: "/placeholder.svg?height=200&width=200",
        },
        "indie-mix": {
          title: "Indie Mix",
          description: "Fresh indie tracks",
          color: "#1e3264",
          image: "/placeholder.svg?height=200&width=200",
        },
        "pheelz-mix": {
          title: "Pheelz Mix",
          description: "Afrobeats and more",
          color: "#148a08",
          image: "/placeholder.svg?height=200&width=200",
        },
        "daily-mix-1": {
          title: "Daily Mix 1",
          description: "Based on your listening history",
          color: "#509bf5",
          image: "/placeholder.svg?height=200&width=200",
        },
        "daily-mix-4": {
          title: "Daily Mix 4",
          description: "Based on your listening history",
          color: "#ba5d07",
          image: "/placeholder.svg?height=200&width=200",
        },
        "daily-mix-5": {
          title: "Daily Mix 5",
          description: "Based on your listening history",
          color: "#e61e32",
          image: "/placeholder.svg?height=200&width=200",
        },
        "folk-acoustic": {
          title: "Folk & Acoustic Mix",
          description: "Soothing acoustic tracks",
          color: "#8c1932",
          image: "/placeholder.svg?height=200&width=200",
        },
        "workout-mix": {
          title: "Workout Mix",
          description: "High energy tracks to keep you moving",
          color: "#ff6437",
          image: "/placeholder.svg?height=200&width=200",
        },
        "focus-mix": {
          title: "Focus Mix",
          description: "Concentration-enhancing music",
          color: "#503750",
          image: "/placeholder.svg?height=200&width=200",
        },
        "throwback-mix": {
          title: "Throwback Mix",
          description: "Nostalgic hits from the past",
          color: "#e1118c",
          image: "/placeholder.svg?height=200&width=200",
        },
      }

      return (
        playlistsInfo[id] || {
          title: "Unknown Playlist",
          description: "Playlist not found",
          color: "#333333",
          image: "/placeholder.svg?height=200&width=200",
        }
      )
    }

    setPlaylist(getPlaylistInfo())

    // 6 random songs from the database
    if (songs.length > 0) {
      const shuffled = [...songs].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 6)
      setPlaylistSongs(selected)
    }
  }, [id, songs])

  const handleSongClick = (song) => {
    // Find the index of this song in the main songs array
    const songIndex = songs.findIndex((s) => s._id === song._id)

    if (songIndex !== -1) {
      playSong(songIndex)
    }
  }

  if (!playlist) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return (
    <div className="playlist-detail-page">
      {/* Header with gradient background */}
      <div
        className="playlist-detail-header"
        style={{ background: `linear-gradient(to bottom, ${playlist.color}, #121212)` }}
      >
        <div className="playlist-detail-header-content">
          <div className="playlist-detail-image-container">
            <img src={playlist.image || "/placeholder.svg"} alt={playlist.title} className="playlist-detail-image" />
          </div>
          <div className="playlist-detail-info">
            <div className="playlist-detail-type">PLAYLIST</div>
            <h1 className="playlist-detail-title">{playlist.title}</h1>
            <div className="playlist-detail-description">{playlist.description}</div>
            <div className="playlist-detail-meta">
              <span className="playlist-detail-creator">Webster</span>
              <span className="playlist-detail-dot">•</span>
              <span className="playlist-detail-songs">{playlistSongs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Songs list */}
      <div className="playlist-detail-content">
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
            {playlistSongs.map((song, index) => (
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
