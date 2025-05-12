"use client"
import { useRef, useEffect, useState } from "react"
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2, Heart, Plus } from "lucide-react"
import { useMusic } from "../../context/MusicContext"
import { usePlaylist } from "../../contexts/PlaylistContext"
import { useAuth } from "../../contexts/AuthContext"
import { AddToPlaylistModal } from "./AddToPlaylistModal/AddToPlaylistModal"
import { AddToCommentModal } from "./AddToCommentModal/AddToCommentModal"
import "./MusicPlayer.css"
import { useLocation } from 'react-router-dom'



export function MusicPlayer({ onSongAdded }) {
  const audioRef = useRef(null)
  const { songs, currentIndex, isPlaying, togglePlay, skipNext, skipPrev } = useMusic()
  const { likedSongs, toggleLike, fetchLikedSongs, isLiked } = usePlaylist()
  const { user } = useAuth()
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false)
  const location = useLocation()
  const [isAddToCommentModalOpen, setIsAddToCommentModalOpen] = useState(false);
  
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isLiking, setIsLiking] = useState(false)

  const currentSong = songs[currentIndex] || {}
  const duration = Number(currentSong.duration) || 0

  useEffect(() => {
    if (user) {
      fetchLikedSongs()
    }
  }, [user, fetchLikedSongs])

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
      isPlaying ? audio.play().catch((err) => console.error("Error playing audio:", err)) : audio.pause()
    }
  }, [isPlaying, currentIndex])

  const formatTime = (seconds) => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleLike = async () => {
    if (currentSong._id && !isLiking) {
      try {
        setIsLiking(true)
        await toggleLike(currentSong)
      } finally {
        setIsLiking(false)
      }
    }
  }


  const handleSongAdded = (playlistId) => {
    if (onSongAdded) onSongAdded(playlistId);
  }

  return (
    <div className="fixed-bottom bg-black border-top border-dark music-player">
      {currentSong.audio && (
        <audio ref={audioRef} src={currentSong.audio} preload="metadata" autoPlay onEnded={skipNext} />
      )}

      <div className="music-player-container">
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
              className={`btn btn-link p-0 ms-2 ${isLiked(currentSong._id) ? "text-danger" : "text-secondary"}`}
              onClick={handleLike}
              disabled={isLiking || !currentSong._id}
            >
              <Heart size={16} fill={isLiked(currentSong._id) ? "currentColor" : "none"} />
            </button>
             <button
              className="btn btn-link p-0 ms-2 text-secondary"
              onClick={() => setIsAddToPlaylistModalOpen(true)}
              disabled={!currentSong._id}
            >
              <Plus size={16} />
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

              <button
              className="btn btn-link p-0 ms-2 text-secondary"
              onClick={() => setIsAddToCommentModalOpen(true)}
              disabled={!currentSong?._id}
            >
               💬
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
                <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${progress}%` }}></div>
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

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        song={currentSong}
        onSongAdded={handleSongAdded}
      />
      
      <AddToCommentModal
        isOpen={isAddToCommentModalOpen}
        onClose={() => setIsAddToCommentModalOpen(false)}
        songId={currentSong._id}
     />

</div>)
  
}
