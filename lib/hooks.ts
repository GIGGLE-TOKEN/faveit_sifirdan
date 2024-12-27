'use client'

import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import type { WebSocketMessage, WebSocketEventType } from './types'

let socket: any

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000')
      socket.on('connect', () => setIsConnected(true))
      socket.on('disconnect', () => setIsConnected(false))
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  const subscribe = useCallback(<T>(type: WebSocketEventType, callback: (payload: T) => void) => {
    socket.on(type, callback)
    return () => {
      socket.off(type, callback)
    }
  }, [])

  const send = useCallback((type: WebSocketEventType, payload: any) => {
    socket.emit('message', { type, payload })
  }, [])

  const joinRoom = useCallback((userId: string) => {
    socket.emit('join', userId)
  }, [])

  const leaveRoom = useCallback((userId: string) => {
    socket.emit('leave', userId)
  }, [])

  return { isConnected, subscribe, send, joinRoom, leaveRoom }
}

