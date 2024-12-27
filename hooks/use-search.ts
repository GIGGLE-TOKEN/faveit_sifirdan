'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useDebounce } from './use-debounce'
import { search, getSearchSuggestions, trackSearchAnalytics } from '@/lib/search'
import type { SearchState, SearchResult, SearchSuggestion, FavoriteType } from '@/types'

interface SearchFilters {
  rating?: number
  year?: number
  genre?: string
}

interface UseSearchOptions {
  type?: FavoriteType
  initialFilters?: SearchFilters
}

export function useSearch(initialQuery: string = '', options: UseSearchOptions = {}) {
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<SearchFilters>(options.initialFilters || {})
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular'>('relevance')
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    results: [],
    suggestions: [],
    hasMore: false,
    page: 1
  })

  const searchStartTime = useRef<number>()
  const debouncedQuery = useDebounce(query, 300)

  const searchWithOptions = useCallback(async (
    searchQuery: string,
    page: number = 1
  ) => {
    if (!searchQuery.trim()) {
      setState(prev => ({ ...prev, results: [], hasMore: false, page: 1 }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))
    searchStartTime.current = Date.now()

    try {
      const { results, hasMore } = await search(searchQuery, page, {
        type: options.type,
        sortBy,
        filters
      })
      
      setState(prev => ({
        ...prev,
        results: page === 1 ? results : [...prev.results, ...results],
        hasMore,
        page,
        isLoading: false
      }))

      await trackSearchAnalytics({
        query: searchQuery,
        timestamp: new Date().toISOString(),
        resultCount: results.length,
        userAgent: navigator.userAgent,
        duration: Date.now() - (searchStartTime.current || Date.now())
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to perform search. Please try again.',
        isLoading: false
      }))
    }
  }, [options.type, sortBy, filters])

  const loadMore = useCallback(() => {
    if (state.isLoading || !state.hasMore) return
    searchWithOptions(query, state.page + 1)
  }, [query, state.isLoading, state.hasMore, state.page, searchWithOptions])

  useEffect(() => {
    if (debouncedQuery) {
      searchWithOptions(debouncedQuery)
    }
  }, [debouncedQuery, searchWithOptions])

  return {
    query,
    setQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    ...state,
    loadMore
  }
}

