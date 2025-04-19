import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { MusicPlayer } from "./components/music-player/MusicPlayer"
import { Sidebar } from "./components/sidebar/Sidebar"
import { SettingsButton } from "./components/settings-button/SettingsButton"
import HomePage from "./pages/home/HomePage"
import SearchPage from "./pages/search/SearchPage"
import LikesPage from "./pages/likes/LikesPage"
import CreatePlaylistPage from "./pages/home/CreatePlaylistPage"
import PlaylistsPage from "./pages/playlists/PlaylistsPage"
import PlaylistDetailPage from "./pages/playlists/PlaylistDetailPage"
import SigninPage from "./pages/signin/SigninPage"
import SettingsPage from "./pages/settings/SettingsPage"
import AccountSettingsPage from "./pages/settings/AccountSettingsPage"
import { MusicProvider } from "./context/MusicContext"
import { useMusic } from "./context/MusicContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// Protected route component
function ProtectedRoute({ children }) {
  const { user } = useMusic()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

function AppRoutes() {
  const { user } = useMusic()

  return (
    <BrowserRouter>
      {user ? (
        <div className="d-flex vh-100 music-app">
          <Sidebar />
          <div className="main-content">
            <SettingsButton />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
              <Route path="/likes" element={<LikesPage />} />
              <Route path="/create-playlist" element={<CreatePlaylistPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/account-settings" element={<AccountSettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <MusicPlayer />
        </div>
      ) : (
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

function App() {
  return (
    <MusicProvider>
      <AppRoutes />
    </MusicProvider>
  )
}

export default App
