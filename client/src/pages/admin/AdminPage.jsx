import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMusic } from '../../context/MusicContext';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const { songs, addSong, deleteSong, fetchSongs } = useMusic();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    users: false,
    songs: false,
    addSong: false,
    deleteUser: null,
    deleteSong: null
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newSong, setNewSong] = useState({
    name: '',
    artist: '',
    album: '',
    duration: '',
    image: '',
    audio: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadInitialData();
  }, [user, navigate]);

  const loadInitialData = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
      await fetchSongs(); // Refresh songs list
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load data: ' + error.message });
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      setMessage({ type: 'success', text: 'User role updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update user role: ' + error.message });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    setLoading(prev => ({ ...prev, deleteUser: userId }));
    try {
      await deleteUser(userId);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      setMessage({ type: 'success', text: 'User deleted successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete user: ' + error.message });
    } finally {
      setLoading(prev => ({ ...prev, deleteUser: null }));
    }
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, addSong: true }));
    try {
      await addSong(newSong);
      await fetchSongs(); // Refresh songs list
      setNewSong({
        name: '',
        artist: '',
        album: '',
        duration: '',
        image: '',
        audio: ''
      });
      setMessage({ type: 'success', text: 'Song added successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add song: ' + error.message });
    } finally {
      setLoading(prev => ({ ...prev, addSong: false }));
    }
  };

  const handleDeleteSong = async (songId) => {
    if (!window.confirm('Are you sure you want to delete this song? This action cannot be undone.')) {
      return;
    }

    setLoading(prev => ({ ...prev, deleteSong: songId }));
    try {
      await deleteSong(songId);
      await fetchSongs(); // Refresh songs list
      setMessage({ type: 'success', text: 'Song deleted successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete song: ' + error.message });
    } finally {
      setLoading(prev => ({ ...prev, deleteSong: null }));
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      {message.text && (
        <div className={`status-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* User Management Section */}
      <section className="admin-section">
        <h2>User Management</h2>
        <div className={loading.users ? 'loading' : ''}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      disabled={u._id === user._id}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(u._id)}
                      disabled={u._id === user._id || loading.deleteUser === u._id}
                    >
                      {loading.deleteUser === u._id ? 'Deleting...' : 'Delete User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Song Management Section */}
      <section className="admin-section">
        <h2>Add New Song</h2>
        <form onSubmit={handleAddSong} className="song-form">
          <input
            type="text"
            placeholder="Song Name"
            value={newSong.name}
            onChange={(e) => setNewSong({ ...newSong, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Album"
            value={newSong.album}
            onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Duration (e.g., 3:45)"
            value={newSong.duration}
            onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newSong.image}
            onChange={(e) => setNewSong({ ...newSong, image: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Audio URL"
            value={newSong.audio}
            onChange={(e) => setNewSong({ ...newSong, audio: e.target.value })}
            required
          />
          <button type="submit" disabled={loading.addSong}>
            {loading.addSong ? 'Adding Song...' : 'Add Song'}
          </button>
        </form>
      </section>

      {/* Song List Section */}
      <section className="admin-section">
        <h2>Manage Songs</h2>
        <div className={loading.songs ? 'loading' : ''}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song._id}>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteSong(song._id)}
                      disabled={loading.deleteSong === song._id}
                    >
                      {loading.deleteSong === song._id ? 'Deleting...' : 'Delete Song'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPage; 