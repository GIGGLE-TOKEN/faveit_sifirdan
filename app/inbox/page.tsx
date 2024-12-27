'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { NavigationBar } from "@/components/navigation_bar"
import { Plus, AlertCircle } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { NewMessageDialog } from "@/components/new_message_dialog"

// Mock data
const mockConversations = [
  {
    id: '1',
    participants: ['currentUser', 'user1'],
    lastMessage: {
      content: 'Hey, how are you?',
      createdAt: new Date().toISOString(),
    },
    unreadCount: 2,
    otherUser: {
      id: 'user1',
      fullName: 'Jane Smith',
      username: 'janesmith',
      profilePicture: '/placeholder.svg'
    }
  },
  {
    id: '2',
    participants: ['currentUser', 'user2'],
    lastMessage: {
      content: 'Did you see the latest movie?',
      createdAt: new Date().toISOString(),
    },
    unreadCount: 0,
    otherUser: {
      id: 'user2',
      fullName: 'John Doe',
      username: 'johndoe',
      profilePicture: '/placeholder.svg'
    }
  },
]

export default function InboxPage() {
  const [allConversations, setAllConversations] = useState(mockConversations)
  const [filteredConversations, setFilteredConversations] = useState(mockConversations)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setAllConversations(mockConversations)
      setFilteredConversations(mockConversations)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filterConversations = (query: string) => {
    const filtered = allConversations.filter(conv => 
      conv.otherUser.fullName.toLowerCase().includes(query.toLowerCase()) ||
      conv.otherUser.username.toLowerCase().includes(query.toLowerCase()) ||
      conv.lastMessage.content.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredConversations(filtered)
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        filterConversations(searchQuery);
        setIsLoading(false)
      }, 500)
    } else {
      setFilteredConversations(allConversations)
    }
  }

  const startNewConversation = () => {
    router.push('/inbox/new')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black pb-32">
      <div className="container max-w-2xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <Button 
            onClick={() => setShowNewMessageDialog(true)} 
            className="bg-[#7F95EB] text-white hover:bg-[#7F95EB]/80 dark:bg-[#1DA1F2] dark:hover:bg-[#1DA1F2]/80"
            aria-label="New message"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile" passHref>
            <Avatar className="w-10 h-10 border border-[#7F95EB] dark:border-[#2F3336]">
              <AvatarImage src="/placeholder.svg" alt="Profile" className="cursor-pointer" onClick={() => router.push('/profile')}/>
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </Link>
          <Input
            placeholder="Search Messages"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              filterConversations(e.target.value)
            }}
            className="flex-1 border-[#7F95EB] dark:border-[#2F3336] bg-white/10 dark:bg-[#273340] text-white dark:text-[#E7E9EA] placeholder:text-white/70 dark:placeholder:text-[#657786]"
            aria-label="Search messages"
          />
          <Button 
            onClick={handleSearch} 
            variant="ghost" 
            className="text-white dark:text-[#E7E9EA] hover:bg-white/10 dark:hover:bg-[#2F3336]"
          >
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center text-white dark:text-[#E7E9EA]">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            <AlertCircle className="w-6 h-6 mx-auto mb-2" />
            {error}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className="p-4 bg-white/10 dark:bg-[#000000] border-[#7F95EB] dark:border-[#2F3336] cursor-pointer hover:bg-white/20 dark:hover:bg-[#2F3336]"
                onClick={() => router.push(`/inbox/${conversation.participants.find(id => id !== 'currentUser')}`)}
                aria-label={`Conversation with ${conversation.otherUser.fullName}`}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.otherUser.profilePicture} />
                    <AvatarFallback>{conversation.otherUser.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white dark:text-[#E7E9EA] font-medium truncate">
                        {conversation.otherUser.fullName}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-[#17DB4E] dark:bg-[#1DA1F2] text-white dark:text-[#E7E9EA] text-xs font-bold px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 dark:text-[#657786] text-sm truncate">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <NavigationBar />
      <NewMessageDialog 
        open={showNewMessageDialog}
        onOpenChange={setShowNewMessageDialog}
      />
    </div>
  )
}

