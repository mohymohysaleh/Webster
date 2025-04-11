import { PlaylistCard } from "../../components/playlist-card/PlaylistCard"
import { TopMixCard } from "../../components/top-mix-card/TopMixCard"

export default function HomePage() {
  // Playlist IDs for navigation
  const featuredPlaylists = [
    { id: "chill-mix", title: "Chill Mix", image: "/placeholder.svg?height=48&width=48" },
    { id: "pop-mix", title: "Pop Mix", image: "/placeholder.svg?height=48&width=48" },
    { id: "daily-mix-1", title: "Daily Mix 1", image: "/placeholder.svg?height=48&width=48" },
    { id: "daily-mix-5", title: "Daily Mix 5", image: "/placeholder.svg?height=48&width=48" },
    { id: "folk-acoustic", title: "Folk & Acoustic Mix", image: "/placeholder.svg?height=48&width=48" },
    { id: "daily-mix-4", title: "Daily Mix 4", image: "/placeholder.svg?height=48&width=48" },
  ]

  const topMixes = [
    {
      id: "chill-mix",
      title: "Chill Mix",
      artists: "Julia Wolf, Khalid, ayokay and more",
      image: "/placeholder.svg?height=200&width=200",
      color: "yellow",
    },
    {
      id: "pop-mix",
      title: "Pop Mix",
      artists: "Hey Violet, VERITE, Timeflies and more",
      image: "/placeholder.svg?height=200&width=200",
      color: "pink",
    },
    {
      id: "pheelz-mix",
      title: "Pheelz Mix",
      artists: "WizKid, Asake, Tiwa Savage and more",
      image: "/placeholder.svg?height=200&width=200",
      color: "green",
    },
    {
      id: "indie-mix",
      title: "Indie Mix",
      artists: "Joywave, The xx, The Neighbourhood and more",
      image: "/placeholder.svg?height=200&width=200",
      color: "red",
    },
    {
      id: "daily-mix-1",
      title: "Daily Mix 1",
      artists: "Ayra Starr, Lil Kesh, Ed Sheeran and more",
      image: "/placeholder.svg?height=200&width=200",
      color: "teal",
    },
  ]

  return (
    <>
      {/* Header with red background */}
      <div className="bg-danger p-4 pb-3">
        <h1 className="display-6 font-monospace mb-4">Welcome To Webster!</h1>

        {/* Featured playlists grid */}
        <div className="row g-3 mb-4">
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="col-12 col-md-6 col-lg-4">
              <PlaylistCard id={playlist.id} title={playlist.title} image={playlist.image} />
            </div>
          ))}
        </div>
      </div>

      {/* Top mixes section */}
      <div className="p-4 bg-black">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-semibold mb-0">Your top mixes</h2>
          <button className="btn btn-link text-secondary p-0 small">SEE ALL</button>
        </div>

        <div className="row g-4">
          {topMixes.map((mix) => (
            <div key={mix.id} className="col-6 col-md-4 col-lg-2">
              <TopMixCard id={mix.id} title={mix.title} artists={mix.artists} image={mix.image} color={mix.color} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
