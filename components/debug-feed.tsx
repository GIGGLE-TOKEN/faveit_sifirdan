'use client'

import { useState, useEffect } from 'react'
import { FeedList } from './feed-list'

export function DebugFeed() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Attempt to render FeedList
      <FeedList />
    } catch (err) {
      console.error("Error rendering FeedList:", err)
      setError(`Failed to render FeedList: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return <FeedList />
}

