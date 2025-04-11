import { Heart } from "lucide-react"
import { SongContainer } from "../../components/song-container/SongContainer"
import "./LikesPage.css"

export default function LikesPage() {
  return (
    <div className="likes-page">
      {/* Header with gradient background */}
      <div className="likes-header">
        <div className="likes-header-content">
          <div className="likes-icon-container">
            <Heart size={64} className="text-white" />
          </div>
          <div className="likes-title-container">
            <h1 className="likes-title">Liked Songs</h1>
            <div className="user-info">
              <div className="profile-image">
                <img src="/placeholder.svg?height=24&width=24" alt="Profile" />
              </div>
              <span className="username">KareemAdel</span>
              <span className="song-count">• 34 songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="likes-content">
        <SongContainer />
      </div>
    </div>
  )
}
