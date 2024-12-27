'use client'

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MoreVertical, Edit, Trash, Paperclip, Check, AlertCircle } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

// Mock data
const mockMessages = [
  {
    id: '1',
    content: 'Hey, how are you?',
    senderId: 'currentUser',
    receiverId: 'user1',
    createdAt: new Date().toISOString(),
    read: true
  },
  {
    id: '2',
    content: 'I\'m good, thanks! How about you?',
    senderId: 'user1',
    receiverId: 'currentUser',
    createdAt: new Date().toISOString(),
    read: true
  },
  {
    id: '3',
    content: 'Doing great! Want to catch up later?',
    senderId: 'currentUser',
    receiverId: 'user1',
    createdAt: new Date().toISOString(),
    read: false
  }
]

const mockUser = {
  id: 'user1',
  fullName: 'Jane Smith',
  profilePicture: '/placeholder.svg'
}

export default function ConversationPage() {
  const { userId } = useParams()
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [otherUser, setOtherUser] = useState(mockUser)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingMessage, setEditingMessage] = useState<{ id: string, content: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulating data fetching
    setIsLoading(true)
    setTimeout(() => {
      setMessages(mockMessages)
      setOtherUser(mockUser)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: String(Date.now()),
        content: newMessage,
        senderId: 'currentUser',
        receiverId: userId as string,
        createdAt: new Date().toISOString(),
        read: false
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId))
  }

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ))
    setEditingMessage(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulating file upload
      toast({
        title: "File Upload",
        description: `Uploaded: ${file.name}`,
      })
    }
  }

  if (isLoading) {
    return <div className="text-center text-white p-4">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <AlertCircle className="w-6 h-6 mx-auto mb-2" />
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black flex flex-col">
      <div className="p-4 bg-white/10 dark:bg-[#273340] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={otherUser.profilePicture} />
            <AvatarFallback>{otherUser.fullName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-white font-bold">{otherUser.fullName}</h1>
          </div>
        </div>
        <Button variant="ghost" onClick={() => router.push('/inbox')} className="text-white">
          Back to Inbox
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id}
            className={`p-2 max-w-[80%] ${
              message.senderId === 'currentUser' 
                ? 'bg-[#7F95EB] dark:bg-[#1DA1F2] ml-auto' 
                : 'bg-white/10 dark:bg-[#2F3336] mr-auto'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white">
                  {editingMessage?.id === message.id ? (
                    <Input
                      value={editingMessage.content}
                      onChange={(e) => setEditingMessage({...editingMessage, content: e.target.value})}
                      className="bg-white/10 text-white border-none"
                    />
                  ) : (
                    message.content
                  )}
                </p>
              </div>
              {message.senderId === 'currentUser' && (
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical className="w-4 h-4 text-white/70" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-white/10 border-[#7F95EB]">
                    <Button
                      variant="ghost"
                      className="w-full text-white justify-start"
                      onClick={() => setEditingMessage({ id: message.id, content: message.content })}
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-white justify-start"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            {editingMessage?.id === message.id && (
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingMessage(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleEditMessage(message.id, editingMessage.content)}
                >
                  Save
                </Button>
              </div>
            )}
            {message.read && message.senderId === 'currentUser' && (
              <div className="flex justify-end mt-1">
                <Check className="w-4 h-4 text-[#17DB4E]" />
              </div>
            )}
          </Card>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white/10 dark:bg-[#273340] flex gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 border-[#7F95EB] dark:border-[#2F3336] bg-white/10 dark:bg-[#273340] text-white dark:text-[#E7E9EA] placeholder:text-white/70 dark:placeholder:text-[#657786]"
        />
        <Button onClick={() => fileInputRef.current?.click()} className="bg-[#7F95EB] dark:bg-[#1DA1F2] text-white hover:bg-[#7F95EB]/80 dark:hover:bg-[#1DA1F2]/80">
          <Paperclip className="w-4 h-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button onClick={handleSendMessage} className="bg-[#7F95EB] dark:bg-[#1DA1F2] text-white hover:bg-[#7F95EB]/80 dark:hover:bg-[#1DA1F2]/80">
          Send
        </Button>
      </div>
    </div>
  )
}

