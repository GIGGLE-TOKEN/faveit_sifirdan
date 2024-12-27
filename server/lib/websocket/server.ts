import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { WebSocketEventType, WebSocketMessage } from './types'

export const initWebSocket = (server: HTTPServer) => {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('join', (userId: string) => {
      socket.join(userId)
      io.emit('USER_ONLINE', { userId })
    })

    socket.on('leave', (userId: string) => {
      socket.leave(userId)
      io.emit('USER_OFFLINE', { userId })
    })

    socket.on('message', (message: WebSocketMessage) => {
      switch (message.type) {
        case 'NEW_MESSAGE':
          io.to(message.payload.receiverId).emit('NEW_MESSAGE', message.payload)
          break
        case 'MESSAGE_READ':
          io.to(message.payload.senderId).emit('MESSAGE_READ', message.payload)
          break
        // ... handle other event types
      }
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })

  return io
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket?.server?.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = initWebSocket(res.socket?.server as any)
    res.socket.server.io = io
  }
  res.end()
}

