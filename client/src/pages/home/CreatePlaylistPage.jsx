import { useState } from 'react';
import { usePlaylist } from '../../contexts/PlaylistContext';
import './CreatePlaylistPage.css';

export default function CreatePlaylistPage() {
  const { createPlaylist } = usePlaylist();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await createPlaylist(name, description);
      setSuccess(true);
      setName('');
      setDescription('');
    } catch (err) {
      setError('Failed to create playlist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-playlist-page">
      <form className="create-playlist-form" onSubmit={handleSubmit}>
        <h2>Create a New Playlist</h2>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading || !name}>
          {loading ? 'Creating...' : 'Create Playlist'}
        </button>
        {success && <div className="success-message">Playlist created!</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
