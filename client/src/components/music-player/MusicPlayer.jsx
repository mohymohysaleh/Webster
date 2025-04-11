"use client"

import { useState, useRef, useEffect } from "react"
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Heart,
} from "lucide-react"
import "./MusicPlayer.css"

export function MusicPlayer() {
  const audioRef = useRef(null)
  const [songs, setSongs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)

  const currentSong = songs[currentIndex] || {}
  const duration = Number(currentSong.duration) || 0

  useEffect(() => {
    fetch("http://localhost:5000/api/music/db")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching music:", err))
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume / 100

    const updateProgress = () => {
      if (!duration) return
      setProgress((audio.currentTime / duration) * 100)
    }

    audio.addEventListener("timeupdate", updateProgress)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [volume, duration])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      isPlaying ? audio.play() : audio.pause()
    }
  }, [isPlaying, currentIndex])

  const togglePlay = () => setIsPlaying(!isPlaying)

  const skipNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length)
    setIsPlaying(true)
  }

  const skipPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)
    setIsPlaying(true)
  }

  const formatTime = (seconds) => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed-bottom bg-black border-top border-dark px-3 py-2 music-player">
      {currentSong.audio && (
        <audio
          ref={audioRef}
          src={currentSong.audio}
          preload="metadata"
          autoPlay
          onEnded={skipNext}
        />
      )}

      <div className="row align-items-center">
        {/* Now Playing */}
        <div className="col-3 d-flex align-items-center gap-3">
          <div className="bg-secondary" style={{ width: "48px", height: "48px" }}>
            <img
              src={currentSong.image || "/placeholder.svg"}
              alt="Album cover"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          <div>
            <div className="small fw-medium">{currentSong.name || "Loading..."}</div>
            <div className="small text-secondary">{currentSong.artist || ""}</div>
          </div>
          <button
            className={`btn btn-link p-0 ms-2 ${isFavorite ? "text-danger" : "text-secondary"}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Controls */}
        <div className="col-6 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center gap-4 mb-2">
            <button className="btn btn-link p-0 text-secondary">
              <Shuffle size={16} />
            </button>
            <button className="btn btn-link p-0 text-secondary" onClick={skipPrev}>
              <SkipBack size={20} />
            </button>
            <button
              className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px" }}
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="btn btn-link p-0 text-secondary" onClick={skipNext}>
              <SkipForward size={20} />
            </button>
            <button className="btn btn-link p-0 text-secondary">
              <Repeat size={16} />
            </button>
          </div>

          {/* Seek Bar */}
          <div className="d-flex align-items-center gap-2 w-100 small text-secondary">
            <span>{formatTime((duration * progress) / 100)}</span>
            <div
              className="progress flex-grow-1"
              style={{ height: "4px", cursor: "pointer" }}
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect()
                const percent = ((e.clientX - rect.left) / rect.width) * 100
                setProgress(percent)
                if (audioRef.current) {
                  audioRef.current.currentTime = (duration * percent) / 100
                }
              }}
            >
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="col-3 d-flex align-items-center justify-content-end gap-2">
          <Volume2 size={16} className="text-secondary" />
          <div
            className="progress"
            style={{ width: "100px", height: "4px", cursor: "pointer" }}
            onClick={(e) => {
              const rect = e.target.getBoundingClientRect()
              const percent = ((e.clientX - rect.left) / rect.width) * 100
              setVolume(percent)
              if (audioRef.current) audioRef.current.volume = percent / 100
            }}
          >
            <div className="progress-bar bg-danger" style={{ width: `${volume}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
