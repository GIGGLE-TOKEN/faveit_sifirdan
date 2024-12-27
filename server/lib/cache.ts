'use server'

import { Redis } from '@upstash/redis'
import type { CacheItem } from '@/types/search'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

const CACHE_TTL = 3600 // 1 hour in seconds

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached as string) : null
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

export async function setCached<T>(key: string, value: T, p0: number): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(value), { ex: CACHE_TTL })
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch (error) {
    console.error('Cache invalidation error:', error)
  }
}

