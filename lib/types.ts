export type WebSocketEventType = 
  | 'POST_CREATED'
  | 'POST_LIKED'
  | 'POST_BOOKMARKED'
  | 'COMMENT_ADDED'
  | 'USER_FOLLOWED'
  | 'NEW_MESSAGE'
  | 'MESSAGE_READ'
  | 'USER_ONLINE'
  | 'USER_OFFLINE'
  | 'TYPING_STATUS'
  | 'READ_RECEIPT'

export interface WebSocketMessage<T = any> {
  type: WebSocketEventType
  payload: T
  timestamp: string
}

export interface UserPresence {
  userId: string
  status: 'online' | 'offline'
  lastSeen: string
}

export interface PostUpdate {
  postId: string
  userId: string
  action: 'like' | 'bookmark' | 'comment'
  data?: any
}

export interface MessageReceived {
  messageId: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
}

export interface TypingStatusUpdate {
  conversationId: string
  userId: string
  isTyping: boolean
}

export interface ReadReceiptUpdate {
  messageId: string
  userId: string
  readAt: string
}

