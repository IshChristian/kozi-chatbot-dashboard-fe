"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      if (email && password) {
        const userData = {
          id: 1,
          email: email,
          name: email.split("@")[0],
        }

        localStorage.setItem("authToken", "mock-jwt-token")
        localStorage.setItem("userData", JSON.stringify(userData))

        setIsAuthenticated(true)
        setUser(userData)
        return { success: true }
      }
      return { success: false, error: "Invalid credentials" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password) => {
    try {
      // Simulate API call
      if (name && email && password) {
        const userData = {
          id: Date.now(),
          email: email,
          name: name,
        }

        localStorage.setItem("authToken", "mock-jwt-token")
        localStorage.setItem("userData", JSON.stringify(userData))

        setIsAuthenticated(true)
        setUser(userData)
        return { success: true }
      }
      return { success: false, error: "All fields are required" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
