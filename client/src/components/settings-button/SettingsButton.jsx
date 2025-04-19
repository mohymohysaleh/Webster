"use client"

import { useNavigate } from "react-router-dom"
import { Settings } from "lucide-react"
import "./SettingsButton.css"

export function SettingsButton() {
  const navigate = useNavigate()

  return (
    <button className="settings-icon-button" onClick={() => navigate("/settings")} aria-label="Settings">
      <Settings size={100} className="settings-icon" />
    </button>
  )
}
