'use server'

import type { SearchResult } from '@/types/search'

export async function searchIMDB(query: string): Promise<SearchResult[]> {
  // This is a mock implementation. In a real app, you'd call an actual IMDB API.
  console.log('Searching IMDB for:', query)
  return [
    {
      id: 'tt0111161',
      type: 'favorite',
      title: 'The Shawshank Redemption',
      subtitle: '1994 • 9.3/10',
      imageUrl: 'https://example.com/shawshank.jpg'
    },
    {
      id: 'tt0068646',
      type: 'favorite',
      title: 'The Godfather',
      subtitle: '1972 • 9.2/10',
      imageUrl: 'https://example.com/godfather.jpg'
    }
  ]
}

