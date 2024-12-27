'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import type { SearchResult } from '@/types/search'

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  onLoadMore: () => void
}

export function SearchResults({ results, isLoading, error, hasMore, onLoadMore }: SearchResultsProps) {
  const observerTarget = useRef<HTMLDivElement>(null)

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore()
      }
    },
    [hasMore, isLoading, onLoadMore]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    })

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerCallback])

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <Card 
          key={result.id}
          className="p-4 bg-white/10 border-[#7F95EB] cursor-pointer hover:bg-white/20"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={result.imageUrl} />
              <AvatarFallback>
                {result.title.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{result.title}</p>
              {result.subtitle && (
                <p className="text-white/70 text-sm truncate">{result.subtitle}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
      
      <div ref={observerTarget} className="h-4" />
      
      {isLoading && (
        <div className="flex justify-center p-4">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
      )}
    </div>
  )
}

