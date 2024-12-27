'use client'

import { useState, useEffect, useCallback } from 'react'
import type { WebSocketMessage, WebSocketEventType } from './types'

class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout = 1000
  private listeners: Map<WebSocketEventType, Set<(payload: any) => void>> = new Map()

  constructor(private url: string) {}

  connect() {
    try {
      this.ws = new WebSocket(this.url)
      
      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          this.notifyListeners(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.attemptReconnect()
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
      this.attemptReconnect()
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect()
      }, this.reconnectTimeout * this.reconnectAttempts)
    }
  }

  subscribe<T>(type: WebSocketEventType, callback: (payload: T) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(callback)

    return () => {
      const callbacks = this.listeners.get(type)
      if (callbacks) {
        callbacks.delete(callback)
      }
    }
  }

  private notifyListeners(message: WebSocketMessage) {
    const callbacks = this.listeners.get(message.type)
    if (callbacks) {
      callbacks.forEach(callback => callback(message.payload))
    }
  }

  send(type: WebSocketEventType, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        payload,
        timestamp: new Date().toISOString()
      }
      this.ws.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  disconnect() {
    this.ws?.close()
    this.ws = null
    this.listeners.clear()
  }
}

let wsClient: WebSocketClient | null = null

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!wsClient) {
      wsClient = new WebSocketClient(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001')
      wsClient.connect()
    }

    return () => {
      if (wsClient) {
        wsClient.disconnect()
        wsClient = null
      }
    }
  }, [])

  const subscribe = useCallback(<T>(type: WebSocketEventType, callback: (payload: T) => void) => {
    return wsClient?.subscribe(type, callback)
  }, [])

  const send = useCallback((type: WebSocketEventType, payload: any) => {
    wsClient?.send(type, payload)
  }, [])

  return { isConnected, subscribe, send }
}

