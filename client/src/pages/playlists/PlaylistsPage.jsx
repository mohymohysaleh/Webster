"use client"

import { useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { PlaylistCard } from "../../components/playlist-card/PlaylistCard"
import { usePlaylist } from '../../contexts/PlaylistContext';
import "./PlaylistsPage.css"

export default function PlaylistsPage() {
  const { playlists, fetchPlaylists } = usePlaylist();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  // Add a handler to refresh playlists after deletion or creation
  const handleRefresh = useCallback(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

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
              <div key={playlist._id} className="playlist-item">
                <PlaylistCard
                  id={playlist._id}
                  title={playlist.name}
                  description={playlist.description}
                  coverImage={playlist.coverImage}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-playlists text-center text-secondary mt-5">
            <p>You don't have any playlists yet</p>
            <button className="btn btn-outline-light mt-3" onClick={() => navigate('/create-playlist')}>Create Playlist</button>
          </div>
        )}
      </div>
    </div>
  )
}
