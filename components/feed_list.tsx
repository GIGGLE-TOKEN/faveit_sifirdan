'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send, MessageSquare, Bookmark, Heart } from 'lucide-react'
import { CommentDialog } from './comment_dialog'
import { ForwardDialog } from './forward_dialog'
import Link from 'next/link'
import { LiveRegion, AriaLabelledBy } from './accessibility_improvements'

interface Post {
  id: string
  userId: string
  username: string
  fullName: string
  content: string
  favoriteItem: {
    type: 'Movie' | 'Series' | 'Book' | 'Music'
    title: string
    link: string
  }
  avatarUrl?: string
  likes: string[]
  bookmarks: string[]
  comments: any[]
}

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    username: 'enes',
    fullName: 'Enes',
    content: 'Love, Life, Loss and Death. I cried!',
    favoriteItem: {
      type: 'Movie',
      title: 'Here (2024)',
      link: 'https://www.imdb.com/title/example'
    },
    avatarUrl: '/placeholder.svg',
    likes: [],
    bookmarks: [],
    comments: []
  },
  {
    id: '2',
    userId: '1',
    username: 'enes',
    fullName: 'Enes',
    content: 'This book completely changed my perspective on life. A must-read!',
    favoriteItem: {
      type: 'Book',
      title: 'The Alchemist',
      link: 'https://www.goodreads.com/book/show/865.The_Alchemist'
    },
    avatarUrl: '/placeholder.svg',
    likes: [],
    bookmarks: [],
    comments: []
  },
  {
    id: '3',
    userId: '1',
    username: 'enes',
    fullName: 'Enes',
    content: 'This album is on repeat. Every track is a masterpiece!',
    favoriteItem: {
      type: 'Music',
      title: 'After Hours',
      link: 'https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj'
    },
    avatarUrl: '/placeholder.svg',
    likes: [],
    bookmarks: [],
    comments: []
  },
  {
    id: '4',
    userId: '1',
    username: 'enes',
    fullName: 'Enes',
    content: 'Just finished binge-watching this series. The plot twists are mind-blowing!',
    favoriteItem: {
      type: 'Series',
      title: 'Stranger Things',
      link: 'https://www.netflix.com/title/80057281'
    },
    avatarUrl: '/placeholder.svg',
    likes: [],
    bookmarks: [],
    comments: []
  }
]

export function FeedList() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showCommentDialog, setShowCommentDialog] = useState(false)
  const [showForwardDialog, setShowForwardDialog] = useState(false)
  const [liveRegionMessage, setLiveRegionMessage] = useState('')
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const focusableElements = feedRef.current?.querySelectorAll('[tabindex="0"]') || []
        const focusedElement = document.activeElement
        const currentIndex = Array.from(focusableElements).indexOf(focusedElement as Element)
        let nextIndex

        if (e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length
        } else {
          nextIndex = (currentIndex + 1) % focusableElements.length
        }

        (focusableElements[nextIndex] as HTMLElement).focus()
      }
    }

    feedRef.current?.addEventListener('keydown', handleKeyDown)
    return () => feedRef.current?.removeEventListener('keydown', handleKeyDown)
  }, [])

  const getActionButton = (type: string) => {
    switch (type) {
      case 'Movie':
      case 'Series':
        return 'Watch'
      case 'Book':
        return 'Read'
      case 'Music':
        return 'Listen'
      default:
        return 'Link'
    }
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes('currentUser')
        setLiveRegionMessage(isLiked ? 'Post unliked' : 'Post liked')
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== 'currentUser')
            : [...post.likes, 'currentUser']
        }
      }
      return post
    }))
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isBookmarked = post.bookmarks.includes('currentUser')
        setLiveRegionMessage(isBookmarked ? 'Post removed from bookmarks' : 'Post bookmarked')
        return {
          ...post,
          bookmarks: isBookmarked 
            ? post.bookmarks.filter(id => id !== 'currentUser')
            : [...post.bookmarks, 'currentUser']
        }
      }
      return post
    }))
  }

  return (
    <div ref={feedRef} className="space-y-4 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-black">
      <LiveRegion message={liveRegionMessage} />
      {posts.map((post) => (
        <Card key={post.id} className="p-4 bg-white/10 dark:bg-black dark:border-[#2F3336] border-0 w-full" tabIndex={0}>
          <AriaLabelledBy id={`post-${post.id}`} label={`Post by ${post.fullName}`}>
            <div className="flex items-start gap-3 sm:gap-4">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <Link href={`/${post.username}`} passHref>
                  <AvatarImage src={post.avatarUrl} alt={`${post.username}'s profile`} className="cursor-pointer" />
                </Link>
                <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white dark:text-[#E7E9EA] font-medium mb-1 text-sm sm:text-base">
                  <span className="font-bold">{post.fullName}</span>{' '}
                  <span className="text-white/70 dark:text-[#657786] text-xs sm:text-sm">@{post.username}</span>
                </p>
                <p className="text-white dark:text-[#E7E9EA] mb-2 text-sm sm:text-base" aria-label="Post content">{post.content}</p>
                <p className="text-white/70 dark:text-[#657786] text-xs sm:text-sm" aria-label="Favorite item">
                  @{post.username} has just added {post.favoriteItem.title} to their favorite {post.favoriteItem.type}s
                </p>
                <div className="flex items-center justify-between sm:justify-start sm:gap-6 mt-4">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/10 dark:text-gray-400 dark:hover:bg-gray-800 p-0"
                    onClick={() => {
                      setSelectedPost(post)
                      setShowForwardDialog(true)
                    }}
                    aria-label="Forward post"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/10 dark:text-gray-400 dark:hover:bg-gray-800 p-0"
                    onClick={() => {
                      setSelectedPost(post)
                      setShowCommentDialog(true)
                    }}
                    aria-label="Comment on post"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-white dark:text-gray-400 hover:text-white/80 dark:hover:text-white px-2 sm:px-4 py-1 h-8 text-xs sm:text-sm w-[70px] text-center justify-center"
                    onClick={() => window.open(post.favoriteItem.link, '_blank')}
                    aria-label={`Go to ${post.favoriteItem.title}`}
                  >
                    {getActionButton(post.favoriteItem.type)}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`text-white hover:bg-white/10 dark:text-gray-400 dark:hover:bg-gray-800 p-0 ${post.bookmarks.includes('currentUser') ? 'text-[#17DB4E] dark:text-[#1DA1F2]' : ''}`}
                    onClick={() => handleBookmark(post.id)}
                    aria-label={post.bookmarks.includes('currentUser') ? 'Remove bookmark' : 'Bookmark post'}
                  >
                    <Bookmark className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`text-white hover:bg-white/10 dark:text-gray-400 dark:hover:bg-gray-800 p-0 ${post.likes.includes('currentUser') ? 'text-[#17DB4E] dark:text-[#1DA1F2]' : ''}`}
                    onClick={() => handleLike(post.id)}
                    aria-label={post.likes.includes('currentUser') ? 'Unlike post' : 'Like post'}
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </AriaLabelledBy>
        </Card>
      ))}

      <CommentDialog
        open={showCommentDialog}
        onOpenChange={setShowCommentDialog}
        post={selectedPost}
        onComment={(comment) => {
          console.log('Adding comment:', comment, 'to post:', selectedPost?.id)
          setShowCommentDialog(false)
          setLiveRegionMessage('Comment added successfully')
        }}
      />

      <ForwardDialog
        open={showForwardDialog}
        onOpenChange={setShowForwardDialog}
        post={selectedPost}
      />
    </div>
  )
}

