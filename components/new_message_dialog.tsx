'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFocusTrap } from '@/hooks/use-focus-trap'

interface NewMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewMessageDialog({ open, onOpenChange }: NewMessageDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const router = useRouter()
  const focusTrapRef = useFocusTrap(open)

  const mockUsers = [
    {
      id: '1',
      username: 'corybaters1895',
      fullName: 'Cory Bates',
      profilePicture: '/placeholder.svg',
      following: true
    },
    {
      id: '2',
      username: 'CryptoBull2020',
      fullName: 'CryptoBull',
      profilePicture: '/placeholder.svg',
      following: false
    },
    {
      id: '3',
      username: 'Aimandanh',
      fullName: 'Amanda',
      profilePicture: '/placeholder.svg',
      verified: true,
      following: true
    }
  ]

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId)
      }
      return [...prev, userId]
    })
  }

  const handleNext = () => {
    if (selectedUsers.length > 0) {
      // Here you would typically create the conversation
      const conversationId = selectedUsers.join('-')
      router.push(`/inbox/${conversationId}`)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} aria-label="New message">
      <DialogContent className="max-w-2xl h-[90vh] p-0 bg-[#A690F2] dark:bg-black">
        <div ref={focusTrapRef}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold text-white">New message</h2>
          </div>
          <Button
            onClick={handleNext}
            disabled={selectedUsers.length === 0}
            className="bg-white/10 text-white hover:bg-white/20 rounded-full px-4 py-2"
          >
            Next
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-5 h-5 text-[#1DA1F2]" />
            <Input
              placeholder="Search people"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-white placeholder:text-[#7F95EB] focus-visible:ring-0 text-xl p-0"
            />
          </div>

          <button
            className="flex items-center gap-4 w-full p-4 hover:bg-white/5 rounded-lg transition-colors mb-4"
            onClick={() => router.push('/inbox/new-group')}
          >
            <div className="w-12 h-12 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#1DA1F2]" />
            </div>
            <span className="text-white text-lg font-semibold">Create a group</span>
          </button>

          <div className="space-y-2">
            {mockUsers
              .filter(user => 
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(user => (
                <button
                  key={user.id}
                  className="flex items-center gap-4 w-full p-4 hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => handleSelectUser(user.id)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.profilePicture} />
                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{user.fullName}</span>
                      {user.verified && (
                        <span className="text-[#1DA1F2]">✓</span>
                      )}
                    </div>
                    <span className="text-white/60">@{user.username}</span>
                    {user.following && (
                      <span className="text-white/60 text-sm block">Following</span>
                    )}
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <div className="w-6 h-6 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

