'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('http://localhost:3001/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then(res => {
        setAuth({ token, user: res.data.user })
      })
      .catch(() => {
        setAuth({ token: null, user: null })
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (token) => {
    setLoading(true)
    localStorage.setItem('token', token)

    try {
      const res = await axios.get('http://localhost:3001/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })

      setAuth({ token, user: res.data.user })
    } catch (err) {
      console.error('Failed to fetch user after login', err)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuth({ token: null, user: null })
  }

  const setUser = (user) => setAuth(prev => ({ ...prev, user }))

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
