'use server'

import type { SearchResult } from '@/types/search'

export async function searchSpotify(query: string): Promise<SearchResult[]> {
  // This should be integrated with cursor.ai's Spotify API client
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,album,artist`, {
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_API_KEY}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch from Spotify')
  }

  const data = await response.json()
  
  return [
    ...data.tracks.items.map((track: any) => ({
      id: track.id,
      type: 'favorite',
      title: track.name,
      subtitle: `${track.artists[0].name} • ${track.album.name}`,
      imageUrl: track.album.images[0].url
    })),
    ...data.albums.items.map((album: any) => ({
      id: album.id,
      type: 'favorite',
      title: album.name,
      subtitle: `Album • ${album.artists[0].name}`,
      imageUrl: album.images[0].url
    }))
  ]
}

