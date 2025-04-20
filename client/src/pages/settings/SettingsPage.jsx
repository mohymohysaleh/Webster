"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { UserCog, LogOut, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import "./SettingsPage.css"

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout, deleteAccount } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to logout:", error)
      toast.error("Failed to logout. Please try again.")
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and will delete all your playlists and liked songs."
    )
    if (confirmed) {
      try {
        // Double-confirm for safety
        const doubleConfirm = window.confirm(
          "THIS IS PERMANENT! Are you absolutely sure you want to delete your account?"
        )
        
        if (doubleConfirm) {
          await deleteAccount()
          toast.success("Your account has been deleted.")
          navigate("/login")
        }
      } catch (error) {
        console.error("Failed to delete account:", error)
        toast.error("Failed to delete account. Please try again.")
      }
    }
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-options">
        <button className="settings-button" onClick={() => navigate("/account-settings")}>
          <UserCog size={24} />
          <span>Account Settings</span>
          {user && <div className="user-name">{user.name}</div>}
        </button>

        <button className="settings-button logout" onClick={handleLogout}>
          <LogOut size={24} />
          <span>Log Out</span>
        </button>

        <button className="settings-button delete" onClick={handleDeleteAccount}>
          <Trash2 size={24} />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  )
}
