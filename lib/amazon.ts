'use server'

import type { SearchResult } from '@/types/search'

export async function searchAmazon(query: string): Promise<SearchResult[]> {
  // This should be integrated with cursor.ai's Amazon API client
  const response = await fetch(`https://api.amazon.com/search?q=${encodeURIComponent(query)}`, {
    headers: {
      'Authorization': `Bearer ${process.env.AMAZON_API_KEY}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch from Amazon')
  }

  const data = await response.json()
  
  return data.results.map((item: any) => ({
    id: item.id,
    type: 'favorite',
    title: item.title,
    subtitle: `${item.author} • ${item.rating}/5`,
    imageUrl: item.image
  }))
}

