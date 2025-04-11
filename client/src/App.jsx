import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MusicPlayer } from "./components/music-player/MusicPlayer"
import { Sidebar } from "./components/sidebar/Sidebar"
import HomePage from "./pages/home/HomePage"
import SearchPage from "./pages/search/SearchPage"
import LikesPage from "./pages/likes/LikesPage"
import CreatePlaylistPage from "./pages/home/CreatePlaylistPage"
import PlaylistsPage from "./pages/playlists/PlaylistsPage"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex vh-100 music-app">
        <Sidebar />

        <main className="flex-grow-1 overflow-auto w-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="/create-playlist" element={<CreatePlaylistPage />} />
          </Routes>
        </main>

        <MusicPlayer />
      </div>
    </BrowserRouter>
  )
}

export default App
