'use server'

import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

const RATE_LIMIT = {
  tokens: 60, // Number of tokens (requests)
  interval: 60, // Time window in seconds
}

export async function checkRateLimit(identifier: string): Promise<boolean> {
  const key = `ratelimit:${identifier}`
  
  try {
    const [tokens] = await redis
      .multi()
      .incr(key)
      .expire(key, RATE_LIMIT.interval)
      .exec()

    return (tokens as number) <= RATE_LIMIT.tokens
  } catch (error) {
    console.error('Rate limit error:', error)
    return true // Allow request on error
  }
}

export async function getRateLimitInfo(identifier: string) {
  const key = `ratelimit:${identifier}`
  
  try {
    const tokens = await redis.get(key) as number
    const ttl = await redis.ttl(key)
    
    return {
      remaining: Math.max(0, RATE_LIMIT.tokens - (tokens || 0)),
      reset: Date.now() + (ttl * 1000),
    }
  } catch (error) {
    console.error('Rate limit info error:', error)
    return {
      remaining: 0,
      reset: Date.now() + (RATE_LIMIT.interval * 1000),
    }
  }
}

