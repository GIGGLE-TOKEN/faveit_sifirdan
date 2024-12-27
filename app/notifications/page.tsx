'use client'

import { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { NavigationBar } from "@/components/navigation_bar"
import { useNotifications } from "@/contexts/NotificationContext"
import { formatTimeAgo } from "@/lib/utils"
import Link from 'next/link'
import { Heart, MessageSquare, UserPlus, AtSign, Reply } from 'lucide-react'
import type { NotificationType } from '@/types'

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return <Heart className="w-5 h-5 text-pink-500" />
    case 'comment':
      return <MessageSquare className="w-5 h-5 text-blue-500" />
    case 'follow':
      return <UserPlus className="w-5 h-5 text-green-500" />
    case 'mention':
      return <AtSign className="w-5 h-5 text-purple-500" />
    case 'reply':
      return <Reply className="w-5 h-5 text-orange-500" />
  }
}

export default function NotificationsPage() {
  const { notifications, markAllAsRead } = useNotifications()

  useEffect(() => {
    markAllAsRead()
  }, [markAllAsRead])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black">
      <div className="container max-w-2xl mx-auto px-4 pt-6 pb-20">
        <h1 className="text-2xl font-bold text-white dark:text-[#E7E9EA] mb-6">Notifications</h1>
        
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className="p-4 bg-white/10 dark:bg-[#000000] border-0 dark:border-[#2F3336]"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <Link href={`/profile/${notification.userId}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1">
                      <p className="text-white dark:text-[#E7E9EA]">
                        <Link href={`/profile/${notification.userId}`} className="font-bold hover:underline">
                          User Name
                        </Link>
                        {' '}
                        {notification.type === 'like' && 'liked your post'}
                        {notification.type === 'comment' && 'commented on your post'}
                        {notification.type === 'follow' && 'followed you'}
                        {notification.type === 'mention' && 'mentioned you'}
                        {notification.type === 'reply' && 'replied to your post'}
                      </p>
                      {notification.content && (
                        <p className="text-white/70 dark:text-[#657786] text-sm mt-1">
                          {notification.content}
                        </p>
                      )}
                      <p className="text-white/50 dark:text-[#657786] text-xs mt-1">
                        {formatTimeAgo(new Date(notification.createdAt))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <div className="text-center text-white/70 dark:text-[#657786] py-8">
              No notifications yet
            </div>
          )}
        </div>
      </div>
      <NavigationBar />
    </div>
  )
}

