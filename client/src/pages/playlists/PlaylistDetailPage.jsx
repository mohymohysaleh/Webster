"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useMusic } from '../../context/MusicContext'
import { usePlaylist } from '../../contexts/PlaylistContext'
import { FiMoreVertical, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import "./PlaylistDetailPage.css"
import { MusicPlayer } from '../../components/music-player/MusicPlayer'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'

export default function PlaylistDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playSongById } = useMusic()
  const { removeFromPlaylist, playlists, setPlaylists } = usePlaylist()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(null)
  const [showPlaylistSettings, setShowPlaylistSettings] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const renameInputRef = useRef()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const fetchPlaylist = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://webster-production.up.railway.app/api/playlists/${id}`, {
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to fetch playlist')
      const data = await response.json()
      setPlaylist(data)
    } catch (err) {
      setPlaylist(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlaylist()
  }, [id])

  const handleSongClick = (song) => {
    playSongById(song._id)
  }

  const handleRemoveSong = async (songId) => {
    await removeFromPlaylist(playlist._id, songId)
    fetchPlaylist()
  }

  const handleMoveSong = async (songId, direction) => {
    const idx = playlist.songs.findIndex(s => s._id === songId);
    if (idx < 0) return;
    let newSongs = [...playlist.songs];
    if (direction === 'up' && idx > 0) {
      [newSongs[idx - 1], newSongs[idx]] = [newSongs[idx], newSongs[idx - 1]];
    } else if (direction === 'down' && idx < newSongs.length - 1) {
      [newSongs[idx + 1], newSongs[idx]] = [newSongs[idx], newSongs[idx + 1]];
    } else {
      return;
    }
    // Call backend to persist order
    await fetch(`https://webster-production.up.railway.app/api/playlists/${playlist._id}/reorder-songs`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songIds: newSongs.map(s => s._id) })
    });
    fetchPlaylist();
  };

  const handleDeletePlaylist = async () => {
    setShowDeleteModal(true)
  }

  const confirmDeletePlaylist = async () => {
    setShowDeleteModal(false)
    await fetch(`https://webster-production.up.railway.app/api/playlists/${playlist._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
    setPlaylists(prev => prev.filter(p => p._id !== playlist._id))
    setDeleted(true)
  }

  const handleRenameClick = () => {
    setRenaming(true)
    setNewName(playlist.name)
    setNewDesc(playlist.description || '')
    setTimeout(() => renameInputRef.current?.focus(), 100)
  }

  const handleRename = async (e) => {
    e.preventDefault()
    await fetch(`https://webster-production.up.railway.app/api/playlists/${playlist._id}/rename`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, description: newDesc })
    })
    setRenaming(false)
    fetchPlaylist()
  }

  const handleSongAdded = () => {
    fetchPlaylist()
  }

  if (deleted) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>
  }
  if (!playlist) {
    return <div className="p-4 text-center">Playlist not found.</div>
  }

  return (
    <div className="playlist-detail-page">
      {/* Header with gradient background */}
      <div
        className="playlist-detail-header"
        style={{ background: `linear-gradient(to bottom, #333, #121212)` }}
      >
        <div className="playlist-detail-header-content">
          <div className="playlist-detail-image-container">
            <img src={playlist.coverImage || "/placeholder.svg"} alt={playlist.name} className="playlist-detail-image" />
          </div>
          <div className="playlist-detail-info">
            <div className="playlist-detail-type">PLAYLIST</div>
            <h1 className="playlist-detail-title">{playlist.name}</h1>
            <div className="playlist-detail-description">{playlist.description}</div>
            <div className="playlist-detail-meta">
              <span className="playlist-detail-creator">{playlist.user?.name || 'Unknown'}</span>
              <span className="playlist-detail-dot">•</span>
              <span className="playlist-detail-songs">{playlist.songs.length} songs</span>
              <button className="playlist-settings-btn" onClick={() => setShowPlaylistSettings(v => !v)}>
                <FiMoreVertical size={20} />
              </button>
              {showPlaylistSettings && (
                <div className="playlist-settings-menu">
                  {!renaming ? (
                    <>
                      <button className="delete-playlist-btn" onClick={handleDeletePlaylist}>
                        <FiTrash2 /> Delete Playlist
                      </button>
                      <button className="delete-playlist-btn" onClick={handleRenameClick}>
                        <FiMoreVertical /> Rename Playlist
                      </button>
                    </>
                  ) : (
                    <form onSubmit={handleRename} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <input ref={renameInputRef} value={newName} onChange={e => setNewName(e.target.value)} placeholder="Playlist name" required style={{ padding: 4, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                      <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description (optional)" style={{ padding: 4, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                      <button type="submit" className="delete-playlist-btn" style={{ color: '#1db954' }}>Save</button>
                    </form>
                  )}
                </div>
              )}
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
              <th className="song-actions"></th>
            </tr>
          </thead>
          <tbody>
            {playlist.songs.map((song, index) => (
              <tr key={song._id || index} className="song-row"
                onMouseEnter={() => setShowSettings(song._id)}
                onMouseLeave={() => setShowSettings(null)}
                onClick={() => handleSongClick(song)}
                style={{ cursor: 'pointer' }}
              >
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
                <td className="song-actions" onClick={e => e.stopPropagation()}>
                  {showSettings === song._id && (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="song-settings-btn" onClick={() => handleRemoveSong(song._id)}>
                        <FiTrash2 />
                      </button>
                      <button className="song-settings-btn" onClick={() => handleMoveSong(song._id, 'up')} disabled={index === 0}>
                        <FiArrowUp />
                      </button>
                      <button className="song-settings-btn" onClick={() => handleMoveSong(song._id, 'down')} disabled={index === playlist.songs.length - 1}>
                        <FiArrowDown />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MusicPlayer onSongAdded={handleSongAdded} />
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Playlist"
          message="Are you sure you want to delete this playlist? This action cannot be undone."
          onConfirm={confirmDeletePlaylist}
          onCancel={() => setShowDeleteModal(false)}
          confirmText="Delete Playlist"
        />
      </div>
    </div>
  )
}
