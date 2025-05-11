export function PlaylistCard({ title, image }) {
  return (
    <div className="d-flex align-items-center gap-3 bg-black bg-opacity-25 rounded p-3 playlist-card">
      <div className="rounded overflow-hidden flex-shrink-0" style={{ width: "48px", height: "48px" }}>
        <img src={image || "/placeholder.svg"} alt={title} className="w-100 h-100 object-fit-cover" />
      </div>
      <span className="fw-medium">{title}</span>
    </div>
  )
}
