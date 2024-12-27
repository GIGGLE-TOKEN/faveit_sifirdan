'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Post, FavoriteItem, Comment } from '@/types'
import { prisma } from '@/server/lib/config/database'
import { checkRateLimit } from '@/server/lib/rate-limit'
import { setCached, getCached } from '@/server/lib/cache'
import { logger } from '@/server/utils/logger'

export async function createPost(formData: FormData) {
  const content = formData.get('content') as string
  const favoriteItemId = formData.get('favoriteItemId') as string
  
  try {
    // Rate limiting check
    await checkRateLimit('create_post')

    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const post = await prisma.post.create({
      data: {
        content,
        favoriteItemId,
        userId,
      },
      include: {
        favoriteItem: true,
        user: true,
      }
    })

    // Cache the new post
    await setCached(`post:${post.id}`, post, 0)
    
    revalidatePath('/')
    return { success: true, post }
  } catch (error) {
    logger.error('Error creating post:', error)
    throw error
  }
}

export async function likePost(postId: string) {
  try {
    await checkRateLimit('like_post')
    
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const like = await prisma.like.create({
      data: {
        postId,
        userId,
      }
    })

    // Invalidate post cache
    await setCached(`post:${postId}:likes`, null, 0)
    
    revalidatePath('/')
    return { success: true, like }
  } catch (error) {
    logger.error('Error liking post:', error)
    throw error
  }
}

export async function bookmarkPost(postId: string) {
  try {
    await checkRateLimit('bookmark_post')
    
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        postId,
        userId,
      }
    })

    // Invalidate bookmarks cache
    await setCached(`post:${postId}:bookmarks`, null, 0)
    
    revalidatePath('/')
    return { success: true, bookmark }
  } catch (error) {
    logger.error('Error bookmarking post:', error)
    throw error
  }
}

export async function unlikePost(postId: string) {
  try {
    await checkRateLimit('unlike_post')
    
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await prisma.like.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        }
      }
    })

    // Invalidate post cache
    await setCached(`post:${postId}:likes`, null, 0)
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    logger.error('Error unliking post:', error)
    throw error
  }
}

export async function unbookmarkPost(postId: string) {
  try {
    await checkRateLimit('unbookmark_post')
    
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    await prisma.bookmark.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        }
      }
    })

    // Invalidate bookmarks cache
    await setCached(`post:${postId}:bookmarks`, null, 0)
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    logger.error('Error removing bookmark:', error)
    throw error
  }
}

export async function followUser(targetUserId: string) {
  try {
    await checkRateLimit('follow_user')
    
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: targetUserId,
      }
    })

    // Invalidate follower/following caches
    await setCached(`user:${userId}:following`, null, 0)
    await setCached(`user:${targetUserId}:followers`, null, 0)
    
    revalidatePath('/')
    return { success: true, follow }
  } catch (error) {
    logger.error('Error following user:', error)
    throw error
  }
}

export async function addFavoriteItem(formData: FormData) {
  try {
    await checkRateLimit('add_favorite')
    
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const link = formData.get('link') as string
    
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const favoriteItem = await prisma.favoriteItem.create({
      data: {
        type,
        title,
        link,
        userId,
      }
    })
    // Invalidate user favorites cache with the correct number of arguments
    await setCached(`user:${userId}:favorites`, null, 0)
    
    revalidatePath('/')
    return { success: true, favoriteItem }
  } catch (error) {
    logger.error('Error adding favorite item:', error)
    throw error
  }
}

export async function getFeed(): Promise<Post[]> {
  try {
    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    // Try to get from cache first
    const cachedFeed = await getCached(`user:${userId}:feed`)
    if (cachedFeed) {
      return cachedFeed as Post[]
    }

    // Get posts from followed users
    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: userId
            }
          }
        }
      },
      include: {
        user: true,
        favoriteItem: true,
        likes: true,
        bookmarks: true,
        comments: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    // Cache the feed
    await setCached(`user:${userId}:feed`, posts, 300) // Cache for 5 minutes

    return posts
  } catch (error) {
    logger.error('Error fetching feed:', error)
    throw error
  }
}

export async function addComment(postId: string, content: string): Promise<Comment> {
  try {
    // Rate limiting check
    await checkRateLimit('add_comment')

    const userId = await (await cookies()).get('userId')?.value
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
      include: {
        user: true,
      }
    })

    // Cache invalidation
    await setCached(`comment:${comment.id}`, comment, 0)
    
    revalidatePath('/')
    return comment
  } catch (error) {
    logger.error('Error adding comment:', error)
    throw error
  }
}

