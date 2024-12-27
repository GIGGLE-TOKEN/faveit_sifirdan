'use client'

import React, { createContext, useContext, useState } from 'react'

interface WebSocketContextType {
  onlineUsers: Set<string>
  lastSeenUsers: Map<string, string>
  pendingMessages: any[]
  markMessageAsRead: (messageId: string) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [onlineUsers] = useState<Set<string>>(new Set())
  const [lastSeenUsers] = useState<Map<string, string>>(new Map())
  const [pendingMessages, setPendingMessages] = useState<any[]>([])

  const markMessageAsRead = (messageId: string) => {
    setPendingMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  return (
    <WebSocketContext.Provider value={{
      onlineUsers,
      lastSeenUsers,
      pendingMessages,
      markMessageAsRead
    }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider')
  }
  return context
}

