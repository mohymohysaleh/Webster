import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { MusicProvider } from "./context/MusicContext";
import { useMusic } from "./context/MusicContext";
import Login from './components/Login';
import GoogleCallback from './components/GoogleCallback';
import { MusicPlayer } from "./components/music-player/MusicPlayer";
import { Sidebar } from "./components/sidebar/Sidebar";
import { SettingsButton } from "./components/settings-button/SettingsButton";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import LikesPage from "./pages/likes/LikesPage";
import CreatePlaylistPage from "./pages/home/CreatePlaylistPage";
import PlaylistsPage from "./pages/playlists/PlaylistsPage";
import PlaylistDetailPage from "./pages/playlists/PlaylistDetailPage";
import SettingsPage from "./pages/settings/SettingsPage";
import AccountSettingsPage from "./pages/settings/AccountSettingsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <MusicPlayer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <MusicProvider>
          <Router>
            <AppRoutes />
          </Router>
        </MusicProvider>
      </PlaylistProvider>
    </AuthProvider>
  );
}

export default App;
