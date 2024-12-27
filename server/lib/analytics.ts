'use server'

import { sql } from '@vercel/postgres'
import type { SearchAnalytics } from '@/types/search'

export async function storeSearchAnalytics(analytics: SearchAnalytics): Promise<void> {
  try {
    await sql`
      INSERT INTO search_analytics (
        query,
        timestamp,
        result_count,
        user_agent,
        duration
      ) VALUES (
        ${analytics.query},
        ${analytics.timestamp},
        ${analytics.resultCount},
        ${analytics.userAgent},
        ${analytics.duration}
      )
    `
  } catch (error) {
    console.error('Analytics storage error:', error)
    throw new Error('Failed to store analytics')
  }
}

export async function getSearchAnalytics(
  startDate: Date,
  endDate: Date
): Promise<SearchAnalytics[]> {
  try {
    const result = await sql`
      SELECT *
      FROM search_analytics
      WHERE timestamp BETWEEN ${startDate.toISOString()} AND ${endDate.toISOString()}
      ORDER BY timestamp DESC
    `
    
    return result.rows as SearchAnalytics[]
  } catch (error) {
    console.error('Analytics retrieval error:', error)
    throw new Error('Failed to retrieve analytics')
  }
}

