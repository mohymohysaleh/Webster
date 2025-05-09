import { useEffect, useState } from 'react';
import { PlaylistCard } from "../../components/playlist-card/PlaylistCard"
import { TopMixCard } from "../../components/top-mix-card/TopMixCard"
import { usePlaylist } from '../../contexts/PlaylistContext';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { playlists, fetchPlaylists } = usePlaylist();
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  useEffect(() => {
    fetch('http://localhost:8000/api/genres')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGenres(data)
        else setGenres([])
      })
      .catch(() => setGenres([]));
  }, []);

  // You can keep topMixes as mock or update to use real data if available
  const topMixes = [];

  return (
    <>
      {/* Header with red background */}
      <div className="bg-danger p-4 pb-3">
        <h1 className="display-6 font-monospace mb-4">Welcome To Webster!</h1>

        {/* Featured playlists grid */}
        <div className="row g-3 mb-4">
          {playlists.slice(0, 6).map((playlist) => (
            <div key={playlist._id} className="col-12 col-md-6 col-lg-4">
              <PlaylistCard id={playlist._id} title={playlist.name} coverImage={playlist.coverImage} description={playlist.description} />
            </div>
          ))}
        </div>
      </div>

      {/* Top mixes section */}
      <div className="p-4 bg-black">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-semibold mb-0">Top Mixes</h2>
        </div>

        {/* Genres grid */}
        <div className="row g-4">
          {genres.map((genre) => (
            <div key={genre._id} className="col-6 col-md-4 col-lg-2">
              <div className="card genre-card top-genre-card" style={{ cursor: 'pointer', '--card-color': '#222' }} onClick={() => navigate(`/genre/${genre._id}`)}>
                <h3 className="card-title genre-name">{genre.name}</h3>
                <img src={genre.coverImage || "/placeholder.svg"} alt={genre.name} className="genre-card-image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
