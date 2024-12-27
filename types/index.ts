import type { DefaultUser } from 'next-auth';

export interface User extends DefaultUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  isActivated: boolean;
  followingCount: number;
  followersCount: number;
  role: string;
  emailVerified: Date | null;
  image: string | null;
}

export type FavoriteType = 'Movie' | 'Series' | 'Book' | 'Music'

export type FavoriteItem = {
  id: string
  type: FavoriteType
  title: string
  link: string
  userId: string
}

export type Comment = {
  id: string
  userId: string
  postId: string
  content: string
  createdAt: string
}

export type Post = {
  id: string
  userId: string
  content: string
  favoriteItem: FavoriteItem
  createdAt: string
  likes: string[]
  bookmarks: string[]
  comments: Comment[]
}

export type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  read: boolean
  readAt?: string
}

export type Conversation = {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  isTyping: boolean
}

export type TypingStatus = {
  userId: string
  isTyping: boolean
}

export type NotificationType = 
  | 'like'
  | 'comment'
  | 'follow'
  | 'mention'
  | 'reply'

export type Notification = {
  id: string
  type: NotificationType
  userId: string // user who triggered the notification
  targetId: string // post id, comment id, etc.
  read: boolean
  createdAt: string
  content?: string
}

