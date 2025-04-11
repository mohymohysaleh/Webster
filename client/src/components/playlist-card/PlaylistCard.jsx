"use client"

import { useNavigate } from "react-router-dom"
import "./PlaylistCard.css"

export function PlaylistCard({ id, title, image, description }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${id}`)
  }

  return (
    <div className="playlist-card" onClick={handleClick}>
      <div className="playlist-card-content">
        <div className="playlist-card-image">
          <img src={image || "/placeholder.svg"} alt={title} />
        </div>
        <div className="playlist-card-info">
          <div className="playlist-card-title">{title}</div>
          {description && <div className="playlist-card-description">{description}</div>}
        </div>
      </div>
    </div>
  )
}
