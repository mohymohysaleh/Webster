import "./TopMixCard.css"

export function TopMixCard({ title, artists, image, color }) {
  return (
    <div className="d-flex flex-column">
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
