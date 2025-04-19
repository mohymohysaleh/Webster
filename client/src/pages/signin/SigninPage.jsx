"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { useMusic } from "../../context/MusicContext"
import WebsterLogo from "../../assets/images/Webster.png"
import "./SigninPage.css"

export default function SigninPage() {
  const [error, setError] = useState("")
  const { setUser } = useMusic()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      // This would typically redirect to Google OAuth
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: "user123",
        name: "John Doe",
        email: "john.doe@example.com",
        photoURL: "/placeholder.svg?height=200&width=200",
      }

      // Store user in context
      setUser(mockUser)

      // Navigate to home page
      navigate("/")
    } catch (err) {
      console.error("Login failed:", err)
      setError("Login failed. Please try again.")
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-container">
        <img src={WebsterLogo || "/placeholder.svg"} alt="Webster" className="signin-logo" />

        {error && <div className="signin-error">{error}</div>}

        <button className="google-signin-button" onClick={handleGoogleSignIn}>
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}
