interface SearchResult {
  id: string
  title: string
  type: string
  source: string
}

export async function searchIMDB(query: string): Promise<SearchResult[]> {
  // IMDB search implementation
  return []
}

export async function searchSpotify(query: string): Promise<SearchResult[]> {
  // Spotify search implementation
  return []
}

export async function searchAmazon(query: string): Promise<SearchResult[]> {
  // Amazon search implementation
  return []
} 