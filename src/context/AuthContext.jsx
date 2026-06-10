import React, { createContext, useContext, useState, useCallback } from 'react'
import { getUserProfile, updateUserProfile } from '../services/portalStore'

const AuthContext = createContext(null)

// Mock user data
const USERS = {
  admin: {
    id: 'admin-001',
    email: 'admin@japanese.international',
    password: 'admin123',
    role: 'admin',
    name: 'Office Admin',
    avatar: 'A',
  },
  student: {
    id: 'stu-001',
    email: 'tanaka@japanese.international',
    password: 'student123',
    role: 'student',
    name: 'Tanaka Hiroshi',
    avatar: 'T',
    level: 'N3',
    enrolled: '2024-09-01',
    progress: 64,
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('japanese_user')
      if (!stored) return null
      const parsed = JSON.parse(stored)
      if (parsed?.id) {
        // Merge session-stored basics with persisted progress (and any future fields).
        return getUserProfile(parsed.id, parsed)
      }
      return parsed
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password, role) => {
    setLoading(true)
    setError(null)
    await new Promise(r => setTimeout(r, 800)) // simulate API

    const matchedUser = Object.values(USERS).find(
      u => u.email === email && u.password === password && u.role === role
    )

    if (matchedUser) {
      const { password: _, ...safeUser } = matchedUser
      const persisted = getUserProfile(safeUser.id, safeUser)
      setUser(persisted)
      sessionStorage.setItem('japanese_user', JSON.stringify(persisted))
      setLoading(false)
      return { success: true, user: safeUser }
    } else {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return { success: false }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('japanese_user')
  }, [])

  const setStudentProgress = useCallback((progress) => {
    if (!user?.id) return
    const next = updateUserProfile(user.id, { progress })
    setUser(next)
    sessionStorage.setItem('japanese_user', JSON.stringify(next))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, setError, setStudentProgress }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
