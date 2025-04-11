"use client"

import { useState } from "react"
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2, Heart } from "lucide-react"
import "./MusicPlayer.css"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFavorite, setIsFavorite] = useState(true)
  const [progress, setProgress] = useState(35)
  const [volume, setVolume] = useState(75)

  return (
    <div className="fixed-bottom bg-black border-top border-dark px-3 py-2 music-player">
      <div className="row align-items-center">
        {/* Currently playing */}
        <div className="col-3 d-flex align-items-center gap-3">
          <div className="bg-secondary" style={{ width: "48px", height: "48px" }}>
            <img src="/placeholder.svg?height=48&width=48" alt="Album cover" className="w-100 h-100 object-fit-cover" />
          </div>
          <div>
            <div className="small fw-medium">Ragea</div>
            <div className="small text-secondary">Amr Diab</div>
          </div>
          <button
            className={`btn btn-link p-0 ms-2 ${isFavorite ? "text-danger" : "text-secondary"}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Player controls */}
        <div className="col-6 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-4 mb-2">
            <button className="btn btn-link p-0 text-secondary">
              <Shuffle size={16} />
            </button>
            <button className="btn btn-link p-0 text-secondary">
              <SkipBack size={20} />
            </button>
            <button
              className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px" }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="btn btn-link p-0 text-secondary">
              <SkipForward size={20} />
            </button>
            <button className="btn btn-link p-0 text-secondary">
              <Repeat size={16} />
            </button>
          </div>

          <div className="d-flex align-items-center gap-2 w-100 small text-secondary">
            <span>2:39</span>
            <div className="progress flex-grow-1" style={{ height: "4px" }}>
              <div
                className="progress-bar bg-white"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span>4:22</span>
          </div>
        </div>

        {/* Volume control */}
        <div className="col-3 d-flex align-items-center justify-content-end gap-2">
          <Volume2 size={16} className="text-secondary" />
          <div className="progress" style={{ width: "100px", height: "4px" }}>
            <div
              className="progress-bar bg-white"
              role="progressbar"
              style={{ width: `${volume}%` }}
              aria-valuenow={volume}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
