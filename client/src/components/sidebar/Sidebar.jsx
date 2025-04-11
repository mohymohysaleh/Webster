import { Link, useLocation } from "react-router-dom"
import { Home, Search, ListMusic, PlusCircle, Heart } from "lucide-react"
import "./Sidebar.css"
import Img1 from '../../assets/images/Webster.png'

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="sidebar bg-black border-end border-dark">
      <div className="p-4">
        <div className="text-center mb-4">
          <Link to="/" className="logo-link">
            <img src={Img1} alt="Webster" className="app-logo" />
          </Link>
        </div>

        <nav className="nav flex-column gap-4">
          <Link
            to="/"
            className={`nav-link d-flex align-items-center gap-3 ${location.pathname === "/" ? "text-white" : "text-secondary"}`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/search"
            className={`nav-link d-flex align-items-center gap-3 ${location.pathname === "/search" ? "text-white" : "text-secondary"}`}
          >
            <Search size={20} />
            <span>Search</span>
          </Link>

          <Link
            to="/playlists"
            className={`nav-link d-flex align-items-center gap-3 ${location.pathname === "/playlists" ? "text-white" : "text-secondary"}`}
          >
            <ListMusic size={20} />
            <span>PlayLists</span>
          </Link>

          <Link
            to="/likes"
            className={`nav-link d-flex align-items-center gap-3 ${location.pathname === "/likes" ? "text-white" : "text-secondary"}`}
          >
            <Heart size={20} />
            <span>Liked</span>
          </Link>

          <Link
            to="/create-playlist"
            className={`nav-link d-flex align-items-center gap-3 ${location.pathname === "/create-playlist" ? "text-white" : "text-secondary"}`}
          >
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
