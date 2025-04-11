import { PlaylistCard } from "../../components/playlist-card/PlaylistCard"
import { TopMixCard } from "../../components/top-mix-card/TopMixCard"

export default function HomePage() {
  return (
    <>
      {/* Header with red background */}
      <div className="bg-danger p-4 pb-3">
        <h1 className="display-6 font-monospace mb-4">Welcome To Webster!</h1>

        {/* Featured playlists grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <PlaylistCard title="Chill Mix" image="/placeholder.svg?height=48&width=48" />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <PlaylistCard title="Pop Mix" image="/placeholder.svg?height=48&width=48" />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <PlaylistCard title="Daily Mix 1" image="/placeholder.svg?height=48&width=48" />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <PlaylistCard title="Daily Mix 5" image="/placeholder.svg?height=48&width=48" />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <PlaylistCard title="Folk & Acoustic Mix" image="/placeholder.svg?height=48&width=48" />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <PlaylistCard title="Daily Mix 4" image="/placeholder.svg?height=48&width=48" />
          </div>
        </div>
      </div>

      {/* Top mixes section */}
      <div className="p-4 bg-black">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-semibold mb-0">Your top mixes</h2>
          <button className="btn btn-link text-secondary p-0 small">SEE ALL</button>
        </div>

        <div className="row g-4">
          <div className="col-6 col-md-4 col-lg-2">
            <TopMixCard
              title="Chill Mix"
              artists="Julia Wolf, Khalid, ayokay and more"
              image="/placeholder.svg?height=200&width=200"
              color="yellow"
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2">
            <TopMixCard
              title="Pop Mix"
              artists="Hey Violet, VERITE, Timeflies and more"
              image="/placeholder.svg?height=200&width=200"
              color="pink"
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2">
            <TopMixCard
              title="Pheelz Mix"
              artists="WizKid, Asake, Tiwa Savage and more"
              image="/placeholder.svg?height=200&width=200"
              color="green"
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2">
            <TopMixCard
              title="Indie Mix"
              artists="Joywave, The xx, The Neighbourhood and more"
              image="/placeholder.svg?height=200&width=200"
              color="red"
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2">
            <TopMixCard
              title="Daily Mix 1"
              artists="Ayra Starr, Lil Kesh, Ed Sheeran and more"
              image="/placeholder.svg?height=200&width=200"
              color="teal"
            />
          </div>
        </div>
      </div>
    </>
  )
}
