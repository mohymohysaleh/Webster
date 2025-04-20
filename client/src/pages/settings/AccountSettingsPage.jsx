"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { ArrowLeft, Upload, User } from "lucide-react"
import { toast } from "react-toastify"
import "./AccountSettingsPage.css"

export default function AccountSettingsPage() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  // Initialize the form with user data when component mounts
  useEffect(() => {
    if (user) {
      setName(user.name || "")
    }
  }, [user])

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty")
      return
    }

    try {
      setIsLoading(true)
      await updateProfile({ name: name.trim() })
      toast.success("Profile updated successfully")
      navigate("/settings")
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setIsLoading(true)
        // TODO: Implement photo upload functionality
        toast.info("Photo upload functionality coming soon!")
      } catch (error) {
        console.error("Failed to upload photo:", error)
        toast.error("Failed to upload photo. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  if (!user) {
    return (
      <div className="account-settings-page">
        <div className="account-settings-header">
          <button className="back-button" onClick={() => navigate("/settings")}>
            <ArrowLeft size={24} />
          </button>
          <h1>Account Settings</h1>
        </div>
        <div className="account-settings-content">
          <p>Loading user information...</p>
        </div>
      </div>
    )
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
            {/* Display user photo or a placeholder */}
            <div className="profile-photo">
              <User size={60} />
            </div>
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

        <div className="user-info-section">
          <div className="user-email">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="user-role">
            <span className="label">Role:</span>
            <span className="value role-badge">{user.role}</span>
          </div>
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
            placeholder="Enter your name"
          />
        </div>

        <button 
          className="save-button" 
          onClick={handleSave}
          disabled={isLoading || !name.trim() || name === user.name}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
