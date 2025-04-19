"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useMusic } from "../../context/MusicContext"
import { ArrowLeft, Upload } from "lucide-react"
import "./AccountSettingsPage.css"

export default function AccountSettingsPage() {
  const navigate = useNavigate()
  const { user, setUser } = useMusic()
  const [name, setName] = useState(user?.name || "")
  const fileInputRef = useRef(null)

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name,
      })
    }
    navigate("/settings")
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (user) {
          setUser({
            ...user,
            photoURL: event.target.result,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="account-settings-page">
      <div className="account-settings-header">
        <button className="back-button" onClick={() => navigate("/settings")}>
          <ArrowLeft size={24} />
        </button>
        <h1>Account Settings</h1>
      </div>

      <div className="account-settings-content">
        <div className="profile-photo-section">
          <div className="profile-photo-container">
            <img
              src={user?.photoURL || "/placeholder.svg?height=120&width=120"}
              alt="Profile"
              className="profile-photo"
            />
            <button className="upload-photo-button" onClick={triggerFileInput}>
              <Upload size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden-file-input"
            />
          </div>
          <p className="photo-help-text">Click to upload a new photo</p>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  )
}
