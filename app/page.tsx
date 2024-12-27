'use client'

import { Suspense } from 'react'
import { NavigationBar } from "@/components/navigation_bar"
import { FeedList } from "@/components/feed_list"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black">
      <div className="container max-w-2xl mx-auto px-4 pt-6 pb-20">
        <Suspense fallback={<div className="text-white dark:text-[#E7E9EA]">Loading feed...</div>}>
          <FeedList />
        </Suspense>
      </div>
      <NavigationBar />
    </div>
  )
}

