'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedList } from "@/components/feed_list"
import { NavigationBar } from "@/components/navigation_bar"
import { useSocial } from "@/contexts/SocialContext"
import { useSession } from "next-auth/react"
import { User, Post, FavoriteType } from "@/types"
import { LinkIcon, Pencil, ArrowLeft, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage({ params }: { params: { username: string } }) {
  // Add check for reserved paths
  const reservedPaths = ['settings', 'notifications', 'messages', 'discover'];
  if (reservedPaths.includes(params.username.toLowerCase())) {
    return null; // This will allow the actual route handler to take over
  }

  const sessionResult = useSession()
  const router = useRouter()

  const { isFollowing, followUser, unfollowUser } = useSocial()
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [activeTab, setActiveTab] = useState<FavoriteType | 'feed' | 'bookmarks'>('feed')

  const isProfileOwner = sessionResult?.status === "authenticated" && sessionResult?.data?.user?.username === params.username

  useEffect(() => {
    // Fetch user data and posts
    const fetchData = async () => {
      // Mock user data
      const userData: User = {
        id: '1',
        username: params.username,
        fullName: "Current User's Full Name",
        email: "user@example.com",
        profilePicture: "/placeholder.svg",
        about: "Current User's About",
        links: ['https://example.com', 'https://twitter.com/username'],
        followingCount: 324,
        followersCount: 620,
        isActivated: true
      }
      setUser(userData)

      // Mock posts data
      const postsData: Post[] = [
        {
          id: '1',
          userId: '1',
          content: 'Just watched an amazing movie!',
          favoriteItem: {
            id: '1',
            type: 'Movie',
            title: 'Inception',
            link: 'https://www.imdb.com/title/tt1375666/',
            userId: '1'
          },
          createdAt: new Date().toISOString(),
          likes: [],
          bookmarks: [],
          comments: []
        },
        {
          id: '2',
          userId: '1',
          content: 'This book changed my life!',
          favoriteItem: {
            id: '2',
            type: 'Book',
            title: '1984',
            link: 'https://www.goodreads.com/book/show/40961427-1984',
            userId: '1'
          },
          createdAt: new Date().toISOString(),
          likes: [],
          bookmarks: [],
          comments: []
        },
      ]
      setPosts(postsData)
      setFilteredPosts(postsData)
    }

    fetchData()
  }, [params.username])

  const handleFollowToggle = async () => {
    if (!user) return
    if (isFollowing(user.id)) {
      await unfollowUser(user.id)
    } else {
      await followUser(user.id)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as FavoriteType | 'feed' | 'bookmarks')
    if (value === 'feed') {
      setFilteredPosts(posts)
    } else if (value === 'bookmarks') {
      setFilteredPosts(posts.filter(post => post.bookmarks.includes(sessionResult?.data?.user?.id || '')))
    } else {
      setFilteredPosts(posts.filter(post => post.favoriteItem.type === value))
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black dark:border-[#2F3336] text-white dark:text-[#E7E9EA]">
      {/* Mobile Header (visible only on mobile) */}
      <div className="flex items-center sm:hidden profile-mobile-header">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Page Specific Layout */}
      <div className="container w-full mx-auto px-0 sm:px-6 lg:px-8 pb-20 profile-page-container">
        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-row items-start gap-6 mb-8 w-full max-w-2xl mx-auto p-4">
          <Avatar className="w-24 h-24 border-2 border-[#7F95EB] dark:border-[#2F3336]">
            <AvatarImage src={user.profilePicture} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start w-full mb-2">
              <div>
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <p className="text-sm text-white/90 dark:text-[#657786]">@{user.username}</p>
              </div>

              <div className="flex gap-2">
                {isProfileOwner ? (
                  <Button
                    variant="outline"
                    className="border-[#7F95EB] dark:border-[#2F3336] text-white"
                    onClick={() => router.push(`/profile/edit`)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-full bg-transparent text-white hover:bg-white/10 font-bold border border-white"
                      onClick={handleFollowToggle}
                    >
                      {isFollowing(user.id) ? 'Following' : 'Follow'}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full bg-transparent text-white hover:bg-white/10 font-bold border border-white"
                      onClick={() => router.push(`/inbox/${user.id}`)}
                    >
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-4 text-sm text-white/90">
                <span>{user.followingCount} Following</span>
                <span>{user.followersCount} Followers</span>
              </div>
              <p className="text-sm">{user.about}</p>
              <div className="flex items-center gap-2 text-sm">
                <LinkIcon className="w-4 h-4" />
                <div className="flex gap-2">
                  {user.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7F95EB] hover:underline"
                    >
                      {new URL(link).hostname}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout for Profile Page */}
        <div className="sm:hidden profile-mobile-layout">
          <div className="relative pb-20">
            <div className="px-4 pt-3">
              {isProfileOwner ? (
                <Button
                  variant="outline"
                  className="absolute right-4 top-2 rounded-full bg-transparent border border-white/20 hover:bg-white/10 text-white text-sm px-4"
                  onClick={() => router.push(`/profile/edit`)}
                >
                  Edit profile
                </Button>
              ) : (
                <div className="flex items-center gap-2 absolute right-4 top-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-10 h-10 border border-white/20"
                    onClick={() => router.push(`/inbox/${user.id}`)}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full bg-transparent text-white hover:bg-white/10 font-bold border border-white"
                    onClick={handleFollowToggle}
                  >
                    {isFollowing(user.id) ? 'Following' : 'Follow'}
                  </Button>
                </div>
              )}

              <Avatar className="w-20 h-20 border-2 border-[#7F95EB] dark:border-[#2F3336] mb-3">
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h1 className="text-xl font-bold">{user.fullName}</h1>
                <p className="text-sm text-white/70">@{user.username}</p>
              </div>

              <p className="mt-3 text-sm">{user.about}</p>

              <div className="flex items-center gap-2 mt-3 text-sm text-white/70">
                <LinkIcon className="w-4 h-4" />
                <div className="flex gap-2">
                  {user.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7F95EB] hover:underline"
                    >
                      {new URL(link).hostname}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-3 text-sm">
                <span><strong>{user.followingCount}</strong> Following</span>
                <span><strong>{user.followersCount}</strong> Followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Shared between mobile and desktop */}
        <div className="w-full max-w-2xl mx-auto">
          <Tabs defaultValue="feed" onValueChange={handleTabChange}>
            <TabsList
              className="w-full border-b border-white/10 px-2 sm:px-4 mb-4"
              isProfileOwner={isProfileOwner || false}
            >
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="Music">Musics</TabsTrigger>
              <TabsTrigger value="Book">Books</TabsTrigger>
              <TabsTrigger value="Movie">Movies</TabsTrigger>
              <TabsTrigger value="Series">Series</TabsTrigger>
              {isProfileOwner && <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>}
            </TabsList>

            <div className="px-4">
              <TabsContent value="feed">
                <FeedList posts={filteredPosts} />
              </TabsContent>
              <TabsContent value="Music">
                <FeedList posts={filteredPosts} />
              </TabsContent>
              <TabsContent value="Book">
                <FeedList posts={filteredPosts} />
              </TabsContent>
              <TabsContent value="Movie">
                <FeedList posts={filteredPosts} />
              </TabsContent>
              <TabsContent value="Series">
                <FeedList posts={filteredPosts} />
              </TabsContent>
              {isProfileOwner && (
                <TabsContent value="bookmarks">
                  <FeedList posts={filteredPosts} />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <NavigationBar />
      </div>
    </div>
  )
}

