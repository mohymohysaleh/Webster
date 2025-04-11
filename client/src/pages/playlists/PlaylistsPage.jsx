"use client"

import { useEffect, useState } from "react"
import { PlaylistCard } from "../../components/playlist-card/PlaylistCard"
import "./PlaylistsPage.css"

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    // Mock playlists data
    const mockPlaylists = [
      {
        id: "chill-mix",
        title: "Chill Mix",
        description: "Relaxing tunes to unwind",
        image: "/placeholder.svg?height=48&width=48",
      },
      {
        id: "pop-mix",
        title: "Pop Mix",
        description: "Today's top pop hits",
        image: "/placeholder.svg?height=48&width=48",
      },
      {
        id: "indie-mix",
        title: "Indie Mix",
        description: "Fresh indie tracks",
        image: "/placeholder.svg?height=48&width=48",
      },
      {
        id: "workout-mix",
        title: "Workout Mix",
        description: "High energy tracks to keep you moving",
        image: "/placeholder.svg?height=48&width=48",
      },
      {
        id: "focus-mix",
        title: "Focus Mix",
        description: "Concentration-enhancing music",
        image: "/placeholder.svg?height=48&width=48",
      },
      {
        id: "throwback-mix",
        title: "Throwback Mix",
        description: "Nostalgic hits from the past",
        image: "/placeholder.svg?height=48&width=48",
      },
    ]

    setPlaylists(mockPlaylists)
  }, [])

  return (
    <div className="playlists-page">
      <div className="playlists-header">
        <h1 className="playlists-title">Playlists</h1>
        <div className="playlists-subtitle">Your personal collections and mixes</div>
      </div>

      <div className="playlists-content">
        {playlists.length > 0 ? (
          <div className="playlists-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <PlaylistCard
                  id={playlist.id}
                  title={playlist.title}
                  description={playlist.description}
                  image={playlist.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-playlists text-center text-secondary mt-5">
            <p>You don't have any playlists yet</p>
            <button className="btn btn-outline-light mt-3">Create Playlist</button>
          </div>
        )}
      </div>
    </div>
  )
}
