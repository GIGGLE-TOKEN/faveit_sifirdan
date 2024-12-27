import { PrismaClient } from '@prisma/client'
import { logger } from '@/server/utils/logger'

// Initialize Prisma Client with error logging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'error', emit: 'event' }
    ],
  })
}

// Ensure only one instance of PrismaClient is created
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// Set up error handling for Prisma Client
prisma.$on('error', (e: any) => {
  logger.error('Prisma Client error:', {
    message: e.message,
    target: e.target,
    context: 'database',
  })
})

prisma.$on('warn', (e: any) => {
  logger.warn('Prisma Client warning:', {
    message: e.message,
    target: e.target,
    context: 'database',
  })
})

// Ensure proper cleanup in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function connectDatabase() {
  try {
    await prisma.$connect()
    logger.info('Successfully connected to database')
  } catch (error) {
    logger.error('Failed to connect to database:', error)
    throw error
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect()
    logger.info('Successfully disconnected from database')
  } catch (error) {
    logger.error('Failed to disconnect from database:', error)
    throw error
  }
}
