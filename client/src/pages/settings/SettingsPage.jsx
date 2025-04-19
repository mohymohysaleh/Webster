"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { UserCog, LogOut, Trash2 } from "lucide-react"
import "./SettingsPage.css"

export default function SettingsPage() {
  const navigate = useNavigate()
  const { logout, deleteAccount } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
    if (confirmed) {
      try {
        await deleteAccount()
        navigate("/login")
      } catch (error) {
        console.error("Failed to delete account:", error)
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
