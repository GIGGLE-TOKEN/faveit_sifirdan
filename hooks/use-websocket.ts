'use client'

import { useState, useEffect, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'
import type { WebSocketEventType } from '@/lib/websocket/types'

let socket: Socket | null = null

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000')
    }

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  const subscribe = useCallback(<T>(type: WebSocketEventType, callback: (payload: T) => void) => {
    if (socket) {
      socket.on(type, callback)
      return () => {
        socket.off(type, callback)
      }
    }
    return () => {}
  }, [])

  const send = useCallback((type: WebSocketEventType, payload: any) => {
    if (socket) {
      socket.emit('message', { type, payload })
    }
  }, [])

  return { isConnected, subscribe, send }
}

