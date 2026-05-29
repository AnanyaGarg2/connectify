import { createContext, useEffect, useState } from 'react'
import { BACKEND_URL } from '../api/url'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const authHeaders = () => ({
    Authorization: token ? `Bearer ${token}` : ''
  })

  const saveAuth = (authToken, authUser) => {
    localStorage.setItem('token', authToken)
    setToken(authToken)
    setUser(authUser)
  }

  const clearAuth = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
  }

  const registerUser = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await BACKEND_URL.post('/auth/register', credentials)
      saveAuth(res.data.access_token || res.data.token, res.data.newUser)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loginUser = async ({ username, email, password }) => {
    setLoading(true)
    setError(null)
    try {
      const payload = email ? { email, password } : { username, password }
      const res = await BACKEND_URL.post('/auth/login', payload)
      saveAuth(res.data.token, res.data.user)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logoutUser = async () => {
    try {
      await BACKEND_URL.post('/auth/logout', {}, { headers: authHeaders() })
    } catch (err) {
      console.error('Logout error', err)
    }
    clearAuth()
  }

  const loadUser = async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await BACKEND_URL.get('/auth/getMe', { headers: authHeaders() })
      setUser(res.data.user)
    } catch (err) {
      clearAuth()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser,
        clearAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
