"use client"

import { useNavigate } from "react-router-dom"
import "./PlaylistCard.css"

export function PlaylistCard({ id, title, image, description }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${id}`)
  }

  return (
    <div
      className="d-flex align-items-center gap-3 bg-black bg-opacity-25 rounded p-3 playlist-card"
      onClick={handleClick}
    >
      <div className="rounded overflow-hidden flex-shrink-0" style={{ width: "48px", height: "48px" }}>
        <img src={image || "/placeholder.svg"} alt={title} className="w-100 h-100 object-fit-cover" />
      </div>
      <div className="d-flex flex-column">
        <span className="fw-medium">{title}</span>
        {description && <span className="small text-secondary">{description}</span>}
      </div>
    </div>
  )
}
