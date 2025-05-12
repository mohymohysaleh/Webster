import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { MusicProvider } from './context/MusicContext';
import { CommentProvider } from './contexts/CommentContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
import AdminPage from './pages/admin/AdminPage';
import GenreDetailPage from './pages/genres/GenreDetailPage';
import Streamer from './components/live-streaming/streamer';
import Listener from './components/live-streaming/listener';
 

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
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
          {/* Admin-only route */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminPage />
              </PrivateRoute>
            }
          />
          
          {/* Regular user routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/playlists"
            element={
              <PrivateRoute>
                <PlaylistsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <PrivateRoute>
                <PlaylistDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/likes"
            element={
              <PrivateRoute>
                <LikesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-playlist"
            element={
              <PrivateRoute>
                <CreatePlaylistPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/account-settings"
            element={
              <PrivateRoute>
                <AccountSettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/genre/:id"
            element={
              <PrivateRoute>
                <GenreDetailPage />
              </PrivateRoute>
            }
          />
          
          {/* Add Streamer and Listener routes */}
          <Route
            path="/streamer"
            element={
              <PrivateRoute>
                <Streamer />
              </PrivateRoute>
            }
          />
          <Route
            path="/listener"
            element={
              <PrivateRoute>
                <Listener />
              </PrivateRoute>
            }
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <MusicPlayer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlaylistProvider>
          <CommentProvider>
            <MusicProvider>
              <AppRoutes />
              <ToastContainer 
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </MusicProvider>
          </CommentProvider>
        </PlaylistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App