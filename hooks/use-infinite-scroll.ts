import { useState, useEffect, useCallback } from 'react'

interface UseInfiniteScrollOptions<T> {
  initialItems: T[]
  fetchMore: (page: number) => Promise<T[]>
  threshold?: number
}

export function useInfiniteScroll<T>({ initialItems, fetchMore, threshold = 300 }: UseInfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const newItems = await fetchMore(page + 1)
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setItems(prevItems => [...prevItems, ...newItems])
        setPage(prevPage => prevPage + 1)
      }
    } catch (error) {
      console.error('Error fetching more items:', error)
    } finally {
      setLoading(false)
    }
  }, [fetchMore, hasMore, loading, page])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore, threshold])

  return { items, loading, hasMore }
}

