'use server'

interface SearchResult {
  id: string
  title: string
  year?: string
  link: string
}

export async function searchByType(type: string, query: string): Promise<SearchResult[]> {
  if (!query.trim()) return []

  switch (type) {
    case 'Movie':
    case 'Series':
      return searchIMDB(query, type)
    case 'Book':
      return searchAmazon(query)
    case 'Music':
      return searchSpotify(query)
    default:
      return []
  }
}

async function searchIMDB(query: string, type: 'Movie' | 'Series'): Promise<SearchResult[]> {
  // Mock IMDB search results
  if (query.toLowerCase().includes('her')) {
    return [
      { id: '1', title: 'Her (2013)', link: 'https://www.imdb.com/title/tt1798709' },
      { id: '2', title: 'Heretic (2024)', link: 'https://www.imdb.com/title/example1' },
      { id: '3', title: 'Death Becomes Her (1992)', link: 'https://www.imdb.com/title/example2' },
    ]
  }
  return []
}

async function searchAmazon(query: string): Promise<SearchResult[]> {
  // Mock Amazon book search
  return [
    { id: '1', title: 'Example Book 1', link: 'https://amazon.com/example1' },
    { id: '2', title: 'Example Book 2', link: 'https://amazon.com/example2' },
  ]
}

async function searchSpotify(query: string): Promise<SearchResult[]> {
  // Mock Spotify search
  return [
    { id: '1', title: 'Example Song 1', link: 'https://spotify.com/track1' },
    { id: '2', title: 'Example Song 2', link: 'https://spotify.com/track2' },
  ]
}

