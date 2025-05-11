export default function CreatePlaylistPage() {
  return (
    <div className="p-4">
      <h1 className="h3 mb-4">Create a New Playlist</h1>

      <div className="card bg-dark text-white border-0 mb-4">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="playlistName" className="form-label">
              Playlist Name
            </label>
            <input type="text" className="form-control bg-black text-white" id="playlistName" />
          </div>

          <div className="mb-3">
            <label htmlFor="playlistDescription" className="form-label">
              Description (optional)
            </label>
            <textarea className="form-control bg-black text-white" id="playlistDescription" rows="3"></textarea>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-danger">Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}
