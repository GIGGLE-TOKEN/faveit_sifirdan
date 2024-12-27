'use server'

import { headers } from 'next/headers'
import type { SearchResult } from '@/types/search'

const ITEMS_PER_PAGE = 20

interface SearchOptions {
  type?: string
  sortBy?: 'relevance' | 'recent' | 'popular'
  filters?: {
    rating?: number
    year?: number
    genre?: string
  }
}

// Mock search results
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'message',
    title: "Parent group's Messages",
    subtitle: "Parent group's Messages's Message Text",
    imageUrl: '/placeholder.svg'
  },
  {
    id: '2',
    type: 'message',
    title: "Parent group's Messages",
    subtitle: "Parent group's Messages's Message Text",
    imageUrl: '/placeholder.svg'
  }
]

export async function search(
  query: string,
  page: number = 1,
  options: SearchOptions = {}
): Promise<{ results: SearchResult[]; hasMore: boolean }> {
  // Simulate search delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const filtered = mockSearchResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.subtitle?.toLowerCase().includes(query.toLowerCase())
  )

  const paginatedResults = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const hasMore = filtered.length > page * ITEMS_PER_PAGE

  return {
    results: paginatedResults,
    hasMore
  }
}

export async function getSearchHistory(): Promise<any[]> {
  return []
}

export async function clearSearchHistory(): Promise<void> {
  // No-op for now
}

export async function trackSearchAnalytics(analytics: any): Promise<void> {
  // No-op for now
}

