import React, { useState } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import "./search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const recentSearches = [
    { id: "1", name: "The Chainsmokers", type: "Artist", imageUrl: "https://i.scdn.co/image/ab676161000051747003c1a9515257a4e8695773" },
    { id: "2", name: "Ed Sheeran", type: "Artist", imageUrl: "https://i.scdn.co/image/ab67616100005174bb54dde680ac05e6d31c1843" },
    { id: "3", name: "Ed Sheeran", type: "Artist", imageUrl: "https://i.scdn.co/image/ab67616100005174bb54dde680ac05e6d31c1843" },
,    { id: "4", name: "Ed Sheeran", type: "Artist", imageUrl: "https://i.scdn.co/image/ab67616100005174bb54dde680ac05e6d31c1843" },
,    { id: "5", name: "Ed Sheeran", type: "Artist", imageUrl: "https://i.scdn.co/image/ab67616100005174bb54dde680ac05e6d31c1843" },

  ];

  const categories = [
    { id: "p1", name: "Podcasts", color: "#274C44", imageUrl: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },
    { id: "m1", name: "Made For You", color: "#4B2D6F", imageUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d8321091063.jpeg" },

    // Add other categories as needed
  ];

  const topGenres = [
    { id: "po2", name: "Pop", color: "#C74242", imageUrl: "https://i.scdn.co/image/ab67706f00000002fcae557b5e4b72a8e4644544" },
    { id: "hh2", name: "Hip-Hop", color: "#BA5D07", imageUrl: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" },
    { id: "hh3", name: "Hip-Hop", color: "#BA5D07", imageUrl: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" },
    { id: "hh3", name: "Hip-Hop", color: "#BA5D07", imageUrl: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" },
    { id: "hh3", name: "Hip-Hop", color: "#BA5D07", imageUrl: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" },
    { id: "hh3", name: "Hip-Hop", color: "#BA5D07", imageUrl: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c" },
  ];

  const handleRemoveRecent = (id) => {
    console.log("Remove recent search:", id);
  };

  const handleItemClick = (item) => {
    setSearchQuery(item.name);
    setShowRecentSearches(false);
  };

  return (
    <div className="layout">
      <div className="main-view">
        <header className="main-view-header">
          <div className="header-nav-buttons">
            <button className="nav-button" aria-label="Go back"><MdNavigateBefore size={24} /></button>
            <button className="nav-button" aria-label="Go forward"><MdNavigateNext size={24} /></button>
          </div>
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
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchQuery("");
                  if (e.key === "Enter") console.log("Searching for:", searchQuery);
                }}
              />
              {searchQuery && (
                <button className="clear-search-button" onClick={() => setSearchQuery("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>
            {showRecentSearches && (
              <div className="recent-searches-panel">
                <h2 className="recent-searches-title">Recent Searches</h2>
                <div className="recent-searches-grid">
                  {recentSearches.map((item) => (
                    <div key={item.id} className="recent-search-item" onClick={() => handleItemClick(item)}>
                      <div className="image-container">
                        <img src={item.imageUrl} alt={item.name} className="recent-search-image" />
                        <button className="remove-search-button" onClick={(e) => { e.stopPropagation(); handleRemoveRecent(item.id); }} aria-label={`Remove ${item.name}`}>
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
          <button className="profile-button" aria-label="User profile">U</button>
        </header>
        <div className="main-content">
          <section className="content-section" aria-labelledby="top-genres-title">
            <div className="section-header">
              <h2 id="top-genres-title" className="section-title">Your Top Genres</h2>
            </div>
            <div className="horizontal-scroll-layout top-genres-grid">
              {topGenres.map((genre) => (
                <div key={genre.id} className="card genre-card top-genre-card" style={{ "--card-color": genre.color }}>
                  <h3 className="card-title genre-name">{genre.name}</h3>
                  <img src={genre.imageUrl} alt="" className="genre-card-image" />
                </div>
              ))}
            </div>
          </section>
          <section className="content-section" aria-labelledby="browse-all-title">
            <div className="section-header">
              <h2 id="browse-all-title" className="section-title">Browse All</h2>
            </div>
            <div className="grid-layout browse-all-grid">
              {categories.map((category) => (
                <div key={category.id} className="card genre-card" style={{ "--card-color": category.color }}>
                  <h3 className="card-title genre-name">{category.name}</h3>
                  <img src={category.imageUrl} alt="" className="genre-card-image" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Search;