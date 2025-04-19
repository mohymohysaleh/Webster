"use client"

import { useNavigate } from "react-router-dom"
import { useMusic } from "../../context/MusicContext"
import { ArrowLeft, User, LogOut, Trash2 } from "lucide-react"
import "./SettingsPage.css"

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, setUser } = useMusic()

  const handleLogout = () => {
    // Clear user from context
    setUser(null)
    // Navigate to signin page
    navigate("/signin")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setUser(null)
      navigate("/signin")
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        <button className="settings-button" onClick={() => navigate("/account-settings")}>
          <User size={20} />
          <span>Account Settings</span>
        </button>

        <button className="settings-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        <button className="settings-button delete-button" onClick={handleDeleteAccount}>
          <Trash2 size={20} />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  )
}
