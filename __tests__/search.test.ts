import { describe, it, expect, beforeEach } from '@jest/globals'
import { jest } from '@jest/globals'
import { search } from '@/server/lib/search'
import { searchIMDB, searchSpotify, searchAmazon } from '@/server/lib/services/search'
import { getCached, setCached } from '@/server/lib/cache'
import { checkRateLimit } from '@/server/lib/rate-limit'
import { indexContent, searchIndex } from '@/server/lib/search-index'
import { storeSearchAnalytics } from '@/server/lib/analytics'
import type { SearchResponse } from '@/types/search'

// Mock implementations with proper types
jest.mock('@/server/lib/services/search')
jest.mock('@/server/lib/cache', () => ({
  getCached: jest.fn(),
  setCached: jest.fn()
}))
jest.mock('@/server/lib/rate-limit', () => ({
  checkRateLimit: jest.fn()
}))
jest.mock('@/server/lib/search-index', () => ({
  indexContent: jest.fn(),
  searchIndex: jest.fn()
}))
jest.mock('@/server/lib/analytics', () => ({
  storeSearchAnalytics: jest.fn()
}))

describe('Search System', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should perform search with caching', async () => {
    const mockResults: SearchResponse = {
      hits: [{
        id: '1',
        title: 'Test',
        type: 'user'
      }],
      total: 1
    }

    // Type the mock implementations
    ;(getCached as jest.MockedFunction<typeof getCached>).mockResolvedValueOnce(null)
    ;(searchIndex as jest.MockedFunction<typeof searchIndex>).mockResolvedValueOnce(mockResults)

    const result = await search('test')

    expect(getCached).toHaveBeenCalled()
    expect(searchIndex).toHaveBeenCalled()
    expect(result.results).toEqual(mockResults.hits)
  })

  it('should respect rate limits', async () => {
    ;(checkRateLimit as jest.MockedFunction<typeof checkRateLimit>).mockResolvedValueOnce(false)

    await expect(search('test')).rejects.toThrow('Rate limit exceeded')
  })

  it('should store analytics', async () => {
    const mockResults: SearchResponse = {
      hits: [{
        id: '1',
        title: 'Test',
        type: 'user'
      }],
      total: 1
    }
    ;(searchIndex as jest.MockedFunction<typeof searchIndex>).mockResolvedValueOnce(mockResults)

    await search('test')

    expect(storeSearchAnalytics).toHaveBeenCalled()
  })
})

