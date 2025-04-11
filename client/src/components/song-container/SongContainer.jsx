import "./SongContainer.css"

const songs = [
  { id: 1, title: "Play It Safe", artist: "Julia Wolf", album: "Play It Safe", duration: "2:12" },
  { id: 2, title: "Ocean Front Apt.", artist: "ayokay", album: "In the Shape of a Dream", duration: "2:12" },
  { id: 3, title: "Free Spirit", artist: "Khalid", album: "Free Spirit", duration: "3:02" },
  { id: 4, title: "Remind You", artist: "FRENSHIP", album: "Vacation", duration: "4:25" },
  { id: 5, title: "Same Old", artist: "SHY Martin", album: "Same Old", duration: "2:56" },
  { id: 6, title: "Free Spirit", artist: "Khalid", album: "Free Spirit", duration: "3:02" },
  { id: 7, title: "Remind You", artist: "FRENSHIP", album: "Vacation", duration: "4:25" },
  { id: 8, title: "Same Old", artist: "SHY Martin", album: "Same Old", duration: "2:56" },
  { id: 9, title: "Free Spirit", artist: "Khalid", album: "Free Spirit", duration: "3:02" },
  { id: 10, title: "Remind You", artist: "FRENSHIP", album: "Vacation", duration: "4:25" },
  { id: 11, title: "Same Old", artist: "SHY Martin", album: "Same Old", duration: "2:56" },
  { id: 12, title: "Another Song", artist: "Artist Name", album: "Album Name", duration: "3:30" },
]

export function SongContainer() {
  return (
    <div className="song-container">
      <table className="song-table">
        <thead>
          <tr>
            <th className="song-number">#</th>
            <th className="song-title">TITLE</th>
            <th className="song-album">ALBUM</th>
            <th className="song-date">DATE ADDED</th>
            <th className="song-duration">⏱️</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id} className="song-row">
              <td className="song-number">{song.id}</td>
              <td className="song-title">
                <div className="song-info">
                  <div className="song-image">
                    <img src="/placeholder.svg?height=40&width=40" alt={song.title} />
                  </div>
                  <div className="song-details">
                    <div className="song-name">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                  </div>
                </div>
              </td>
              <td className="song-album">{song.album}</td>
              <td className="song-date">Today</td>
              <td className="song-duration">{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
