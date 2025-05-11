export function TopMixCard({ title, artists, image, color }) {
  const colorMap = {
    yellow: "#ffc107",
    pink: "#e83e8c",
    green: "#28a745",
    red: "#dc3545",
    teal: "#20c997",
  }

  const borderColor = colorMap[color] || "#6c757d"

  return (
    <div className="d-flex flex-column">
      <div className="position-relative mb-3">
        <div
          className="position-relative rounded-circle overflow-hidden mb-2"
          style={{ width: "100%", paddingBottom: "100%" }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          />
          <div
            className="position-absolute bottom-0 start-50 translate-middle-x"
            style={{ height: "4px", width: "64px", backgroundColor: borderColor, borderRadius: "2px" }}
          ></div>
          <div
            className="position-absolute bottom-0 start-0 end-0 h-25"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))" }}
          ></div>
          <div className="position-absolute bottom-2 start-0 end-0 text-center small fw-medium">{title}</div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold mb-1">{title}</h6>
        <p className="small text-secondary text-truncate">{artists}</p>
      </div>
    </div>
  )
}
