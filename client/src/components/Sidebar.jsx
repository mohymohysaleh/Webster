import { Link } from "react-router-dom"
import { Home, Search, ListMusic, PlusCircle, Headphones } from "lucide-react"

export function Sidebar() {
  return (
    <div className="sidebar bg-black border-end border-dark">
      <div className="p-4">
        <div className="text-center mb-4">
          <div
            className="bg-white rounded-circle p-2 d-inline-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px" }}
          >
            <Headphones className="text-black" size={24} />
          </div>
        </div>

        <nav className="nav flex-column gap-4">
          <Link to="/" className="nav-link text-white d-flex align-items-center gap-3">
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link to="/search" className="nav-link text-secondary d-flex align-items-center gap-3">
            <Search size={20} />
            <span>Search</span>
          </Link>

          <Link to="/playlists" className="nav-link text-secondary d-flex align-items-center gap-3">
            <ListMusic size={20} />
            <span>PlayLists</span>
          </Link>

          <Link to="/create-playlist" className="nav-link text-secondary d-flex align-items-center gap-3">
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
