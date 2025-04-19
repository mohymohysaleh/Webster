import { useState } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';

const Playlist = () => {
  const { playlists, createPlaylist, addToPlaylist, removeFromPlaylist } = usePlaylist();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      await createPlaylist(newPlaylistName, newPlaylistDesc);
      setNewPlaylistName('');
      setNewPlaylistDesc('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create New Playlist</h2>
        <form onSubmit={handleCreatePlaylist} className="space-y-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Playlist Name"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <textarea
            value={newPlaylistDesc}
            onChange={(e) => setNewPlaylistDesc(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Playlist
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
              {playlist.description && (
                <p className="text-gray-600 mb-4">{playlist.description}</p>
              )}
              <div className="space-y-2">
                {playlist.songs?.map((song) => (
                  <div key={song._id} className="flex items-center justify-between">
                    <span>{song.name}</span>
                    <button
                      onClick={() => removeFromPlaylist(playlist._id, song._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist; 