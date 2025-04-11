import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MusicPlayer } from "./components/MusicPlayer"
import { Sidebar } from "./components/Sidebar"
import HomePage from "./pages/home/HomePage"
import Search from "./pages/search/search"
import PlaylistsPage from "./pages/home/PlaylistsPage"
import CreatePlaylistPage from "./pages/home/CreatePlaylistPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex vh-100 music-app">
        <Sidebar />

        <main className="flex-grow-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/create-playlist" element={<CreatePlaylistPage />} />
          </Routes>
        </main>

        <MusicPlayer />
      </div>
    </BrowserRouter>
  )
}

export default App
