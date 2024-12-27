export interface SearchResult {
  id: string
  type: 'user' | 'post' | 'favorite'
  title: string
  subtitle?: string
  imageUrl?: string
}

export interface SearchHistory {
  id: string
  query: string
  timestamp: string
  type: 'user' | 'post' | 'favorite'
}

export interface SearchAnalytics {
  query: string
  timestamp: string
  resultCount: number
  userAgent: string
  duration: number
}

export interface SearchSuggestion {
  id: string
  text: string
  type: 'history' | 'trending' | 'user' | 'hashtag'
}

export interface SearchResponse {
  hits: SearchResult[]
  total: number
}

export interface SearchState {
  isLoading: boolean
  error: string | null
  results: SearchResult[]
  suggestions: SearchSuggestion[]
  hasMore: boolean
  page: number
}
export interface CacheItem<T> {
    value: T
    timestamp: number

}

