import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MusicPlayer } from "./components/music-player/MusicPlayer"
import { Sidebar } from "./components/sidebar/Sidebar"
import HomePage from "./pages/home/HomePage"
import SearchPage from "./pages/search/SearchPage"
import LikesPage from "./pages/likes/LikesPage"
import CreatePlaylistPage from "./pages/home/CreatePlaylistPage"
import PlaylistsPage from "./pages/playlists/PlaylistsPage"
import PlaylistDetailPage from "./pages/playlists/PlaylistDetailPage"
import { MusicProvider } from "./context/MusicContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <div className="d-flex vh-100 music-app">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
              <Route path="/likes" element={<LikesPage />} />
              <Route path="/create-playlist" element={<CreatePlaylistPage />} />
            </Routes>
          </div>
          <MusicPlayer />
        </div>
      </BrowserRouter>
    </MusicProvider>
  )
}

export default App
