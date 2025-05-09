import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMusic } from '../../context/MusicContext';
import "../playlists/PlaylistDetailPage.css";

export default function GenreDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, songs } = useMusic();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/genres/${id}`);
        if (!response.ok) throw new Error('Failed to fetch genre');
        const data = await response.json();
        setGenre(data);
      } catch (err) {
        setGenre(null);
      } finally {
        setLoading(false);
      }
    };
    fetchGenre();
  }, [id]);

  const handleSongClick = (song) => {
    
    const idx = songs.findIndex(s => s._id === song._id);
    if (idx !== -1) {
      playSong(idx);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!genre) return <div className="p-4 text-center">Genre not found.</div>;

  return (
    <div className="playlist-detail-page">
      <div className="playlist-detail-header" style={{ background: `linear-gradient(to bottom, #333, #121212)` }}>
        <div className="playlist-detail-header-content">
          <div className="playlist-detail-image-container">
            <img src={genre.coverImage || "/placeholder.svg"} alt={genre.name} className="playlist-detail-image" />
          </div>
          <div className="playlist-detail-info">
            <div className="playlist-detail-type">GENRE</div>
            <h1 className="playlist-detail-title">{genre.name}</h1>
            <div className="playlist-detail-meta">
              <span className="playlist-detail-songs">{genre.songs.length} songs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="playlist-detail-content">
        <table className="song-table">
          <thead>
            <tr>
              <th className="song-number">#</th>
              <th className="song-title">TITLE</th>
              <th className="song-album">ALBUM</th>
            </tr>
          </thead>
          <tbody>
            {genre.songs.map((song, index) => (
              <tr key={song._id || index} className="song-row"
                onClick={() => handleSongClick(song)}
                style={{ cursor: 'pointer' }}
              >
                <td className="song-number">{index + 1}</td>
                <td className="song-title">
                  <div className="song-info">
                    <div className="song-image">
                      <img src={song.image || "/placeholder.svg?height=40&width=40"} alt={song.name} />
                    </div>
                    <div className="song-details">
                      <div className="song-name">{song.name}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="song-album">{song.album}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 