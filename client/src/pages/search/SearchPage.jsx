"use client"

import { useState, useEffect } from "react"
import { IoSearchOutline, IoClose } from "react-icons/io5"
import { useMusic } from "../../context/MusicContext"
import "./SearchPage.css"
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [musicDatabase, setMusicDatabase] = useState([])
  const { user } = useAuth()
  const [recentSearches, setRecentSearches] = useState([])
  const navigate = useNavigate()
  const [genres, setGenres] = useState([])
  const { songs, playSong } = useMusic()

  useEffect(() => {
    if (songs.length > 0) {
      setMusicDatabase(songs)
    } else {
      const fetchMusicData = async () => {
        try {
          const response = await fetch("https://webster-tau.vercel.app/api/music/db")
          const data = await response.json()
          setMusicDatabase(data)
        } catch (error) {
          console.error("Error fetching music data:", error)
        }
      }
      fetchMusicData()
    }
  }, [songs])

  useEffect(() => {
    if (!user) return;
    fetch('https://webster-production.up.railway.app/auth/recent-searches', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(setRecentSearches)
      .catch(() => setRecentSearches([]));
  }, [user]);

  useEffect(() => {
    fetch('https://webster-production.up.railway.app/api/genres')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGenres(data)
        else setGenres([])
      })
      .catch((err) => {
        console.error('Error fetching genres:', err);
        setGenres([])
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowSearchResults(false)
      setSelectedArtist(null)
      return
    }

    const query = searchQuery.toLowerCase()

    const artistMatch = musicDatabase.find((song) => song.artist.toLowerCase() === query)

    if (artistMatch) {
      setSelectedArtist(artistMatch.artist)
      const artistSongs = musicDatabase.filter((song) => song.artist.toLowerCase() === query)
      setSearchResults(artistSongs)
    } else {
      setSelectedArtist(null)
      const results = musicDatabase.filter(
        (song) => song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query),
      )
      setSearchResults(results)
    }

    setShowSearchResults(true)
  }, [searchQuery, musicDatabase])

  const addRecentSearch = async (song) => {
    if (!user || !song || !song._id) return;
    await fetch('https://webster-production.up.railway.app/auth/recent-searches', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song })
    });
    fetch('https://webster-production.up.railway.app/auth/recent-searches', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(setRecentSearches);
  };

  const handleRemoveRecent = async (songId) => {
    await fetch('https://webster-production.up.railway.app/auth/recent-searches', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId })
    });
    setRecentSearches(prev => prev.filter(s => s.song?._id !== songId));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setSearchQuery("");
  };

  const handleItemClick = (search) => {
    if (search.song && search.song._id) {
      handleSongClick(search.song);
    }
    setShowRecentSearches(false);
  };

  const handleSongClick = (song, index) => {
    const songIndex = songs.findIndex((s) => s._id === song._id);
    if (songIndex !== -1) {
      playSong(songIndex);
      addRecentSearch(song);
    } else {
      console.log("Song not found in main playlist:", song.name);
    }
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="header-search-container">
          <div className="header-search-bar">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Artists, songs, or podcasts"
              className="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button className="clear-search-button" onClick={() => setSearchQuery("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>
          {showRecentSearches && !searchQuery && (
            <div className="recent-searches-panel">
              <h2 className="recent-searches-title">Recent Searches</h2>
              <div className="recent-searches-grid">
                {recentSearches.map((search, idx) => (
                  <div key={idx} className="recent-search-item" onClick={() => handleItemClick(search)}>
                    <div className="image-container">
                      <img src={search.image || search.song?.image || '/placeholder.svg'} alt={search.name || search.song?.name} className="recent-search-image" />
                      <button
                        className="remove-search-button"
                        onClick={e => { e.stopPropagation(); handleRemoveRecent(search.song?._id); }}
                      >
                        <IoClose size={16} />
                      </button>
                    </div>
                    <div className="recent-search-info">
                      <p className="recent-search-name">{search.name || search.song?.name}</p>
                      <p className="recent-search-type">{search.artist || search.song?.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="search-content">
        {showSearchResults ? (
          <div className="search-results">
            <h2 className="section-title">
              {selectedArtist ? `Songs by ${selectedArtist}` : `Results for "${searchQuery}"`}
            </h2>

            <div className="song-results">
              <table className="song-table">
                <thead>
                  <tr>
                    <th className="song-number">#</th>
                    <th className="song-title">TITLE</th>
                    <th className="song-album">ALBUM</th>
                    <th className="song-duration">⏱️</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((song, index) => (
                    <tr key={song._id} className="song-row" onClick={() => handleSongClick(song, index)}>
                      <td className="song-number">{index + 1}</td>
                      <td className="song-title">
                        <div className="song-info">
                          <div className="song-image">
                            <img src={song.image || "/placeholder.svg"} alt={song.name} />
                          </div>
                          <div className="song-details">
                            <div className="song-name">{song.name}</div>
                            <div className="song-artist">{song.artist}</div>
                          </div>
                        </div>
                      </td>
                      <td className="song-album">{song.album}</td>
                      <td className="song-duration">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <section className="content-section" aria-labelledby="top-genres-title">
              <div className="section-header">
                <h2 id="top-genres-title" className="section-title">
                  Your Top Genres
                </h2>
              </div>
              <div className="horizontal-scroll-layout top-genres-grid">
                {Array.isArray(genres) && genres.length > 0 ? (
                  genres.map((genre) => (
                    <div
                      key={genre._id}
                      className="card genre-card top-genre-card"
                      style={{ "--card-color": "#222" }}
                      onClick={() => navigate(`/genre/${genre._id}`)}
                    >
                      <h3 className="card-title genre-name">{genre.name}</h3>
                      <img src={genre.coverImage || "/placeholder.svg"} alt={genre.name} className="genre-card-image" />
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#fff', padding: '2rem' }}>No genres available.</div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
