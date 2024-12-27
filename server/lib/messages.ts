import type { Message, Conversation } from '@/types'

let mockMessages: Message[] = []
let mockConversations: Conversation[] = []

export async function getMessages(userId: string, otherUserId: string): Promise<Message[]> {
  return mockMessages.filter(msg => 
    (msg.senderId === userId && msg.receiverId === otherUserId) ||
    (msg.senderId === otherUserId && msg.receiverId === userId)
  )
}

export async function sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
  const newMessage: Message = {
    id: String(mockMessages.length + 1),
    senderId,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
    read: false
  }
  mockMessages.push(newMessage)
  return newMessage
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  const message = mockMessages.find(msg => msg.id === messageId)
  if (message) {
    message.read = true
    message.readAt = new Date().toISOString()
  }
}

export async function deleteMessage(messageId: string): Promise<void> {
  mockMessages = mockMessages.filter(msg => msg.id !== messageId)
}

export async function editMessage(messageId: string, newContent: string): Promise<Message> {
  const message = mockMessages.find(msg => msg.id === messageId)
  if (!message) {
    throw new Error('Message not found')
  }
  message.content = newContent
  return message
}

export async function sendMessageWithAttachment(senderId: string, receiverId: string, content: string, attachment: File): Promise<Message> {
  const newMessage: Message = {
    id: String(mockMessages.length + 1),
    senderId,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
    read: false,
    attachmentUrl: `https://example.com/uploads/${attachment.name}`
  }
  mockMessages.push(newMessage)
  return newMessage
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  return mockConversations.filter(conv => conv.participants.includes(userId))
}

