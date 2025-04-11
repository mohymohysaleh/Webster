"use client"

import { useState, useEffect } from "react"
import { IoSearchOutline, IoClose } from "react-icons/io5"
import "./SearchPage.css"

// Sample music database with songs and artists
const musicDatabase = [
  {
    id: "1",
    title: "Play It Safe",
    artist: "Julia Wolf",
    album: "Play It Safe",
    duration: "2:12",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    title: "Ocean Front Apt.",
    artist: "ayokay",
    album: "In the Shape of a Dream",
    duration: "2:12",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    title: "Free Spirit",
    artist: "Khalid",
    album: "Free Spirit",
    duration: "3:02",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    title: "Remind You",
    artist: "FRENSHIP",
    album: "Vacation",
    duration: "4:25",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "5",
    title: "Same Old",
    artist: "SHY Martin",
    album: "Same Old",
    duration: "2:56",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "6",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "7",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "8",
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    duration: "3:50",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "9",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: "3:53",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "10",
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: "4:23",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "11",
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    album: "x (Multiply)",
    duration: "4:41",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "12",
    title: "Photograph",
    artist: "Ed Sheeran",
    album: "x (Multiply)",
    duration: "4:19",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState(null)

  const recentSearches = [
    {
      id: "1",
      name: "The Weeknd",
      type: "Artist",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Ed Sheeran",
      type: "Artist",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    { id: "3", name: "Blinding Lights", type: "Song", imageUrl: "/placeholder.svg?height=80&width=80" },
    { id: "4", name: "Taylor Swift", type: "Artist", imageUrl: "/placeholder.svg?height=80&width=80" },
    { id: "5", name: "Shape of You", type: "Song", imageUrl: "/placeholder.svg?height=80&width=80" },
  ]

  const categories = [
    {
      id: "p1",
      name: "Podcasts",
      color: "#274C44",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "m1",
      name: "Made For You",
      color: "#4B2D6F",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    { id: "c1", name: "Charts", color: "#1E3264", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "n1", name: "New Releases", color: "#E8115B", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "d1", name: "Discover", color: "#8400E7", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "l1", name: "Live Events", color: "#7358FF", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "r1", name: "Rock", color: "#E61E32", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "e1", name: "Electronic", color: "#0D73EC", imageUrl: "/placeholder.svg?height=120&width=120" },
  ]

  const topGenres = [
    {
      id: "po2",
      name: "Pop",
      color: "#C74242",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "hh2",
      name: "Hip-Hop",
      color: "#BA5D07",
      imageUrl: "/placeholder.svg?height=120&width=120",
    },
    { id: "rb1", name: "R&B", color: "#503750", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "la1", name: "Latin", color: "#E1118C", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "in1", name: "Indie", color: "#608108", imageUrl: "/placeholder.svg?height=120&width=120" },
    { id: "cl1", name: "Classical", color: "#7D4B32", imageUrl: "/placeholder.svg?height=120&width=120" },
  ]

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowSearchResults(false)
      setSelectedArtist(null)
      return
    }

    const query = searchQuery.toLowerCase()

    // Check if searching for an artist
    const artistMatch = musicDatabase.find((song) => song.artist.toLowerCase() === query)

    if (artistMatch) {
      // If exact artist match, show all songs by that artist
      setSelectedArtist(artistMatch.artist)
      const artistSongs = musicDatabase.filter((song) => song.artist.toLowerCase() === query)
      setSearchResults(artistSongs)
    } else {
      // Otherwise search for songs that match the query in title or artist
      setSelectedArtist(null)
      const results = musicDatabase.filter(
        (song) => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query),
      )
      setSearchResults(results)
    }

    setShowSearchResults(true)
  }, [searchQuery])

  const handleRemoveRecent = (id) => {
    console.log("Remove recent search:", id)
  }

  const handleItemClick = (item) => {
    setSearchQuery(item.name)
    setShowRecentSearches(false)
  }

  const handleSongClick = (song) => {
    console.log("Playing song:", song.title)
    // Here you would implement the logic to play the song
  }

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
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchQuery("")
                if (e.key === "Enter") console.log("Searching for:", searchQuery)
              }}
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
                {recentSearches.map((item) => (
                  <div key={item.id} className="recent-search-item" onClick={() => handleItemClick(item)}>
                    <div className="image-container">
                      <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="recent-search-image" />
                      <button
                        className="remove-search-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveRecent(item.id)
                        }}
                        aria-label={`Remove ${item.name}`}
                      >
                        <IoClose size={16} />
                      </button>
                    </div>
                    <div className="recent-search-info">
                      <p className="recent-search-name">{item.name}</p>
                      <p className="recent-search-type">{item.type}</p>
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
                    <tr key={song.id} className="song-row" onClick={() => handleSongClick(song)}>
                      <td className="song-number">{index + 1}</td>
                      <td className="song-title">
                        <div className="song-info">
                          <div className="song-image">
                            <img src={song.imageUrl || "/placeholder.svg"} alt={song.title} />
                          </div>
                          <div className="song-details">
                            <div className="song-name">{song.title}</div>
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
                {topGenres.map((genre) => (
                  <div
                    key={genre.id}
                    className="card genre-card top-genre-card"
                    style={{ "--card-color": genre.color }}
                  >
                    <h3 className="card-title genre-name">{genre.name}</h3>
                    <img src={genre.imageUrl || "/placeholder.svg"} alt="" className="genre-card-image" />
                  </div>
                ))}
              </div>
            </section>

            <section className="content-section" aria-labelledby="browse-all-title">
              <div className="section-header">
                <h2 id="browse-all-title" className="section-title">
                  Browse All
                </h2>
              </div>
              <div className="grid-layout browse-all-grid">
                {categories.map((category) => (
                  <div key={category.id} className="card genre-card" style={{ "--card-color": category.color }}>
                    <h3 className="card-title genre-name">{category.name}</h3>
                    <img src={category.imageUrl || "/placeholder.svg"} alt="" className="genre-card-image" />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
