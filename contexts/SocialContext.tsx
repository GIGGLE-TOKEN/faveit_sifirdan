'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { User, Post } from '@/types'
import { 
  createPost, 
  likePost as serverLikePost, 
  unlikePost as serverUnlikePost, 
  bookmarkPost as serverBookmarkPost, 
  unbookmarkPost as serverUnbookmarkPost, 
  followUser as serverFollowUser, 
  addFavoriteItem 
} from '@/server/lib/social'

interface SocialContextType {
  followUser: (userId: string) => Promise<void>
  unfollowUser: (userId: string) => Promise<void>
  isFollowing: (userId: string) => boolean
  likePost: (postId: string) => Promise<void>
  unlikePost: (postId: string) => Promise<void>
  bookmarkPost: (postId: string) => Promise<void>
  unbookmarkPost: (postId: string) => Promise<void>
  isLiked: (postId: string) => boolean
  isBookmarked: (postId: string) => boolean
}

const SocialContext = createContext<SocialContextType | undefined>(undefined)

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [following, setFollowing] = useState<Set<string>>(new Set())
  const [likes, setLikes] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())

  const followUser = useCallback(async (userId: string) => {
    const result = await serverFollowUser(userId)
    if (result.success) {
      setFollowing(prev => {
        const next = new Set(prev)
        next.add(userId)
        return next
      })
    }
  }, [])

  const unfollowUser = useCallback(async (userId: string) => {
    const result = await serverFollowUser(userId)
    if (result.success) {
      setFollowing(prev => {
        const next = new Set(prev)
        next.delete(userId)
        return next
      })
    }
  }, [])

  const isFollowing = useCallback((userId: string) => {
    return following.has(userId)
  }, [following])

  const likePost = useCallback(async (postId: string) => {
    const result = await serverLikePost(postId)
    if (result.success) {
      setLikes(prev => {
        const next = new Set(prev)
        next.add(postId)
        return next
      })
    }
  }, [])

  const unlikePost = useCallback(async (postId: string) => {
    const result = await serverUnlikePost(postId)
    if (result.success) {
      setLikes(prev => {
        const next = new Set(prev)
        next.delete(postId)
        return next
      })
    }
  }, [])

  const bookmarkPost = useCallback(async (postId: string) => {
    const result = await serverBookmarkPost(postId)
    if (result.success) {
      setBookmarks(prev => {
        const next = new Set(prev)
        next.add(postId)
        return next
      })
    }
  }, [])

  const unbookmarkPost = useCallback(async (postId: string) => {
    const result = await serverUnbookmarkPost(postId)
    if (result.success) {
      setBookmarks(prev => {
        const next = new Set(prev)
        next.delete(postId)
        return next
      })
    }
  }, [])

  const isLiked = useCallback((postId: string) => {
    return likes.has(postId)
  }, [likes])

  const isBookmarked = useCallback((postId: string) => {
    return bookmarks.has(postId)
  }, [bookmarks])

  return (
    <SocialContext.Provider value={{
      followUser,
      unfollowUser,
      isFollowing,
      likePost,
      unlikePost,
      bookmarkPost,
      unbookmarkPost,
      isLiked,
      isBookmarked,
    }}>
      {children}
    </SocialContext.Provider>
  )
}

export const useSocial = () => {
  const context = useContext(SocialContext)
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider')
  }
  return context
}

