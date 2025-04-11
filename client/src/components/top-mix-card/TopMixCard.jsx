"use client"

import { useNavigate } from "react-router-dom"
import "./TopMixCard.css"

export function TopMixCard({ id, title, artists, image, color }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${id}`)
  }

  return (
    <div className="d-flex flex-column" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="position-relative mb-3">
        <div className={`top-mix-image-container ${color}`}>
          <img src={image || "/placeholder.svg"} alt={title} className="top-mix-image" />
          <div className={`top-mix-indicator ${color}`}></div>
          <div className="top-mix-gradient"></div>
          <div className="top-mix-overlay-title">{title}</div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold mb-1">{title}</h6>
        <p className="small text-secondary text-truncate">{artists}</p>
      </div>
    </div>
  )
}
