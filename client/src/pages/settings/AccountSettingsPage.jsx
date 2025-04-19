"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { ArrowLeft, Upload } from "lucide-react"
import "./AccountSettingsPage.css"

export default function AccountSettingsPage() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.displayName || "")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await updateProfile({ displayName: name })
      navigate("/settings")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setIsLoading(true)
        await updateProfile({ photoFile: file })
      } catch (error) {
        console.error("Failed to upload photo:", error)
        alert("Failed to upload photo. Please try again.")
      } finally {
        setIsLoading(false)
      }
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
              src={user?.photoURL || "/placeholder.svg"}
              alt="Profile"
              className="profile-photo"
            />
            <button 
              className="upload-photo-button" 
              onClick={triggerFileInput}
              disabled={isLoading}
            >
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
            disabled={isLoading}
          />
        </div>

        <button 
          className="save-button" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
