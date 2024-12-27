'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { searchUsers } from "@/backend/lib/users"
import { sendMessage } from "@/backend/lib/messages"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from 'lucide-react'
import { UserSearchResults } from "@/components/user_search_results"
import type { User } from "@/types"

export default function NewConversationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const currentUser = useCurrentUser()
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchQuery])

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      try {
        setIsLoading(true)
        setError(null)
        const results = await searchUsers(query)
        setSearchResults(results)
      } catch (err) {
        setError('Failed to search users. Please try again.')
        toast({
          title: "Error",
          description: "Failed to search users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setSearchResults([])
    setSearchQuery('')
  }

  const handleSendMessage = async () => {
    if (selectedUser && message.trim() && currentUser) {
      try {
        setIsLoading(true)
        await sendMessage(currentUser.id, selectedUser.id, message)
        router.push(`/inbox/${selectedUser.id}`)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!currentUser) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] p-4">
      <h1 className="text-2xl font-bold text-white mb-4">New Message</h1>
      
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Search for a user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-[#7F95EB] bg-white/10 text-white placeholder:text-white/70"
            aria-label="Search for a user"
          />
          {isLoading && (
            <Loader2 className="w-4 h-4 absolute right-3 top-3 animate-spin text-white" />
          )}
        </div>

        {error && (
          <div className="text-red-500 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {searchResults.length > 0 && (
          <Card className="bg-white/10 border-[#7F95EB] p-2">
            <UserSearchResults users={searchResults} onSelectUser={handleSelectUser} />
          </Card>
        )}

        {selectedUser && (
          <div className="space-y-2">
            <p className="text-white">To: {selectedUser.fullName} (@{selectedUser.username})</p>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border-[#7F95EB] bg-white/10 text-white placeholder:text-white/70"
              aria-label="Type your message"
            />
            <Button 
              onClick={handleSendMessage} 
              className="w-full bg-[#7F95EB] text-white hover:bg-[#7F95EB]/80"
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Send Message
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

