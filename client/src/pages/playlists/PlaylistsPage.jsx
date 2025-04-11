import "./PlaylistsPage.css"

export default function PlaylistsPage() {
  return (
    <div className="p-4">
      <h1 className="h3 mb-4">Your Playlists</h1>
      <div className="text-center text-secondary mt-5">
        <p>You don't have any playlists yet</p>
        <button className="btn btn-outline-light mt-3">Create Playlist</button>
      </div>
    </div>
  )
}
