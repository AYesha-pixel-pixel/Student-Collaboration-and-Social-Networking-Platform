import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import createSocket from '../socket'
import api from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const socketRef = useRef(null)
  const [socket, setSocket] = useState(null)
  const [unreadMessageCount, setUnreadMessageCount] = useState(0)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    return token ? { token } : null
  })

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setSocket(null)
    }
  }

  const getUserIdFromToken = (token) => {
    if (!token) return null
    try {
      return JSON.parse(atob(token.split('.')[1])).userId || null
    } catch {
      return null
    }
  }

  const refreshUnreadMessageCount = useCallback(async () => {
    const token = user?.token
    if (!token) {
      setUnreadMessageCount(0)
      return 0
    }

    try {
      const res = await api.get('/messages/unread-count')
      const count = Number(res.data?.count || 0)
      setUnreadMessageCount(count)
      return count
    } catch {
      return 0
    }
  }, [user?.token])

  useEffect(() => {
    const token = user?.token

    if (!token) {
      setUnreadMessageCount(0)
      return undefined
    }

    const socketInstance = createSocket(token)
    const handleConnect = () => setSocket(socketInstance)
    const handleDisconnect = () => {
      if (socketRef.current === socketInstance) {
        socketRef.current = null
        setSocket(null)
      }
    }

    socketRef.current = socketInstance
    socketInstance.on('connect', handleConnect)
    socketInstance.on('disconnect', handleDisconnect)
    socketInstance.connect()

    return () => {
      socketInstance.off('connect', handleConnect)
      socketInstance.off('disconnect', handleDisconnect)
      socketInstance.disconnect()
      if (socketRef.current === socketInstance) {
        socketRef.current = null
      }
    }
  }, [user?.token])

  useEffect(() => {
    const token = user?.token
    if (!token) return undefined

    const currentUserId = getUserIdFromToken(token)
    if (!currentUserId) return undefined

    const alertKey = `studentnet-unread-alert:${currentUserId}`
    if (sessionStorage.getItem(alertKey)) return undefined

    let active = true

    const fetchUnread = async () => {
      try {
        const res = await api.get('/messages/unread-count')
        if (!active) return

        const count = Number(res.data?.count || 0)
        setUnreadMessageCount(count)
        if (count > 0) {
          sessionStorage.setItem(alertKey, 'shown')
          window.alert(`You have ${count} unread message${count === 1 ? '' : 's'}.`)
        }
      } catch {
        return undefined
      }
    }

    fetchUnread()

    return () => {
      active = false
    }
  }, [user?.token])

  useEffect(() => {
    if (!socket || !user?.token) return undefined

    const handlePotentialUnreadChange = () => {
      refreshUnreadMessageCount()
    }

    socket.on('message:received', handlePotentialUnreadChange)
    return () => {
      socket.off('message:received', handlePotentialUnreadChange)
    }
  }, [socket, user?.token, refreshUnreadMessageCount])

  useEffect(() => {
    if (!user?.token) return undefined

    const intervalId = window.setInterval(() => {
      refreshUnreadMessageCount()
    }, 60000)

    return () => window.clearInterval(intervalId)
  }, [user?.token, refreshUnreadMessageCount])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    setUser(userData || { token })
  }

  const logout = () => {
    localStorage.removeItem('token')
    disconnectSocket()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, socket, unreadMessageCount, refreshUnreadMessageCount }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext