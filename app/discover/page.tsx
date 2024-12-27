'use client'

import { useState, useEffect, useCallback } from "react"
import type { User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { NavigationBar } from "@/components/navigation_bar"
import { Button } from "@/components/ui/button"
import { Loader2, Heart, Bookmark, Share2, Send } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSocial } from "@/contexts/SocialContext"
import { searchByType } from '@/backend/lib/search'

interface FeedItem {
  id: string
  userId: string
  username: string
  content: string
  favoriteItem: {
    type: 'Movie' | 'Series' | 'Book' | 'Music'
    title: string
    link: string
  }
  avatar?: string
}

interface TopItem {
  id: string;
  favoriteItem: {
    type: 'Movie' | 'Series' | 'Book' | 'Music';
    title: string;
    link: string;
    count: number;
  };
}

const mockUsers: User[] = [
  { id: '1', username: 'johndoe', fullName: 'John Doe', email: 'john@example.com', profilePicture: '/placeholder.svg', followingCount: 100, followersCount: 200, isActivated: true },
  { id: '2', username: 'janedoe', fullName: 'Jane Doe', email: 'jane@example.com', profilePicture: '/placeholder.svg', followingCount: 150, followersCount: 250, isActivated: true },
  // Add more mock users as needed
]

const mockFeeds: FeedItem[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'moviebuff',
    content: "Just watched Inception again. Mind = blown!",
    favoriteItem: {
      type: 'Movie',
      title: 'Inception',
      link: 'https://www.example.com/inception'
    },
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'bookworm',
    content: "Finished '1984' by George Orwell. A chilling masterpiece!",
    favoriteItem: {
      type: 'Book',
      title: '1984',
      link: 'https://www.example.com/1984'
    },
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'serieslover',
    content: "Can't wait for the next season of Stranger Things!",
    favoriteItem: {
      type: 'Series',
      title: 'Stranger Things',
      link: 'https://www.example.com/strangerthings'
    },
    avatar: '/placeholder.svg'
  },
  {
    id: '4',
    userId: 'user4',
    username: 'musicfan',
    content: "The new album by The Weeknd is on repeat!",
    favoriteItem: {
      type: 'Music',
      title: 'After Hours',
      link: 'https://www.example.com/afterhours'
    },
    avatar: '/placeholder.svg'
  }
]

// Generate 50 mock top items for each category
const generateMockTopItems = (category: 'Movie' | 'Series' | 'Book' | 'Music'): TopItem[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `${category.toLowerCase()}-${Date.now()}-${i + 1}`,
    favoriteItem: {
      type: category,
      title: `${category} ${i + 1}`,
      link: `https://www.example.com/${category.toLowerCase()}${i + 1}`,
      count: Math.floor(Math.random() * 10000) + 1
    }
  }))
}

const mockTopItems: Record<'Movie' | 'Series' | 'Book' | 'Music', TopItem[]> = {
  Movie: generateMockTopItems('Movie'),
  Series: generateMockTopItems('Series'),
  Book: generateMockTopItems('Book'),
  Music: generateMockTopItems('Music')
}

const formatCount = (count: number): string => {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1) + 'B'
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  } else {
    return count.toString()
  }
}

const getActionText = (type: 'Movie' | 'Series' | 'Book' | 'Music'): string => {
  switch (type) {
    case 'Movie':
    case 'Series':
      return 'Watch';
    case 'Book':
      return 'Read';
    case 'Music':
      return 'Listen';
    default:
      return 'Link';
  }
};

export default function DiscoverPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'Movie' | 'Series' | 'Book' | 'Music'>('Movie')
  const [topItems, setTopItems] = useState<TopItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchResults, setSearchResults] = useState<User[]>([])
  const { isLiked, isBookmarked, likePost, unlikePost, bookmarkPost, unbookmarkPost } = useSocial()
  const [likes, setLikes] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
    } else {
      // This is a mock implementation. In a real app, you'd call an API endpoint.
      const filteredUsers = mockUsers.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredUsers)
    }
  }, [])

  const fetchMoreItems = useCallback(async () => {
    setLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const startIndex = (page - 1) * 10
    const endIndex = page * 10
    const newItems = mockTopItems[activeCategory].slice(startIndex, endIndex)
    setTopItems(prev => [...prev, ...newItems])
    setPage(prev => prev + 1)
    setHasMore(endIndex < mockTopItems[activeCategory].length)
    setLoading(false)
  }, [activeCategory, page])

  useEffect(() => {
    setTopItems(mockTopItems['Movie'].slice(0, 10))
    setPage(2)
    setHasMore(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
        !loading &&
        hasMore
      ) {
        fetchMoreItems()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchMoreItems, loading, hasMore])

  const handleCategoryClick = (category: 'Movie' | 'Series' | 'Book' | 'Music') => {
    setActiveCategory(category)
    setTopItems(mockTopItems[category].slice(0, 10))
    setPage(2)
    setHasMore(true)
  }

  const handleLike = (itemId: string) => {
    if (likes.has(itemId)) {
      unlikePost(itemId)
      setLikes(prev => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    } else {
      likePost(itemId)
      setLikes(prev => new Set(prev).add(itemId))
    }
  }

  const handleBookmark = (itemId: string) => {
    if (bookmarks.has(itemId)) {
      unbookmarkPost(itemId)
      setBookmarks(prev => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    } else {
      bookmarkPost(itemId)
      setBookmarks(prev => new Set(prev).add(itemId))
    }
  }

  const handleRepost = (item: TopItem) => {
    // Implement repost functionality here
    console.log('Reposting:', item)
  }

  const handleForward = (item: TopItem) => {
    // Implement forward functionality here
    console.log('Forwarding:', item)
    // You would typically open a dialog or navigate to a messaging interface here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black pb-32">
      <div className="container max-w-2xl mx-auto px-4 pt-6">
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-10 h-10 border border-[#7F95EB]">
              <Link href="/profile" passHref>
                <AvatarImage 
                  src="/placeholder.svg" 
                  alt="Profile" 
                  className="cursor-pointer"
                  onClick={() => router.push('/profile')}
                />
              </Link>
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Search username"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              className="flex-1 border-[#7F95EB] dark:border-[#2F3336] bg-white/10 dark:bg-[#273340] text-white dark:text-[#E7E9EA] placeholder:text-white/70 dark:placeholder:text-[#657786]"
              aria-label="Search users"
            />
          </div>
          {query.trim() !== '' && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-gradient-to-b from-[#C8B5F7] to-[#8E7CC3] dark:bg-[#273340] rounded-md border border-[#7F95EB] dark:border-[#2F3336] max-h-60 overflow-auto">
              {searchResults.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-3 p-3 hover:bg-[#A690F2]/40 dark:hover:bg-[#2F3336] cursor-pointer"
                  onClick={() => router.push(`/${user.username}`)}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.profilePicture} alt={user.fullName} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white dark:text-[#E7E9EA] font-medium">{user.fullName}</p>
                    <p className="text-sm text-white/70 dark:text-[#657786]">@{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
          {['Movie', 'Series', 'Book', 'Music'].map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`text-white dark:text-[#E7E9EA] ${
                activeCategory === category ? 'underline' : ''
              } text-xs sm:text-sm md:text-base lg:text-lg font-medium whitespace-nowrap`}
              onClick={() => handleCategoryClick(category as 'Movie' | 'Series' | 'Book' | 'Music')}
              aria-label={`Filter by ${category}`}
              aria-pressed={activeCategory === category}
            >
              {category === 'Series' ? category : `${category}s`}
            </Button>
          ))}
        </div>

        <div className="mb-6">
          <div className="space-y-4">
            {topItems.map((item) => (
              <Card key={item.id} className="p-4 bg-white/10 dark:bg-[#000000] border-[#7F95EB] dark:border-[#2F3336]">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white dark:text-[#E7E9EA]">{item.favoriteItem.title}</h3>
                    <p className="text-sm text-white/70 dark:text-[#657786]">Added by {formatCount(item.favoriteItem.count)} users</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(item.id)}
                        className={`text-white hover:text-white/80 dark:text-[#E7E9EA] dark:hover:text-white/80 ${
                          likes.has(item.id) ? 'text-yellow-500 dark:text-yellow-500' : ''
                        }`}
                        aria-label={likes.has(item.id) ? 'Unlike' : 'Like'}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmark(item.id)}
                        className={`text-white hover:text-white/80 dark:text-[#E7E9EA] dark:hover:text-white/80 ${
                          bookmarks.has(item.id) 
                            ? 'text-green-500 dark:text-[#1DA1F2] dark:bg-[#1DA1F2] dark:bg-opacity-10' 
                            : ''
                        }`}
                        aria-label={bookmarks.has(item.id) ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <Bookmark className={`h-5 w-5 ${
                          bookmarks.has(item.id) && 'dark:fill-[#1DA1F2]'
                        }`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleForward(item)}
                        className="text-white hover:text-white/80 dark:text-[#E7E9EA] dark:hover:text-white/80"
                        aria-label="Forward to friend"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRepost(item)}
                        className="text-white hover:text-white/80 dark:text-[#E7E9EA] dark:hover:text-white/80"
                        aria-label="Repost"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-white dark:text-[#E7E9EA] hover:bg-white/10 dark:hover:bg-[#2F3336]"
                      onClick={() => window.open(item.favoriteItem.link, '_blank')}
                      aria-label={`${getActionText(item.favoriteItem.type)} ${item.favoriteItem.title}`}
                    >
                      {getActionText(item.favoriteItem.type)}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {loading && (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-white dark:text-[#E7E9EA]" />
              </div>
            )}
            {!hasMore && (
              <p className="text-center text-white/70 dark:text-[#657786] py-4">No more items to load</p>
            )}
          </div>
        </div>
      </div>
      <NavigationBar />
    </div>
  )
}

