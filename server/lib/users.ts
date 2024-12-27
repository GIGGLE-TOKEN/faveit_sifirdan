import type { User } from '@/types'

const mockUsers: User[] = [
  {
    id: "1",
    username: "testuser",
    fullName: "Test User",
    email: "user@example.com",
    profilePicture: "/placeholder.svg",
    about: "This is a test user",
    links: ["https://example.com"],
    followingCount: 10,
    followersCount: 20,
    isActivated: true
  },
  // Add more mock users as needed
]

export async function getUserById(userId: string): Promise<User | null> {
  return mockUsers.find(user => user.id === userId) || null
}

export async function searchUsers(query: string): Promise<User[]> {
  return mockUsers.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase()) || 
    user.fullName.toLowerCase().includes(query.toLowerCase())
  )
}

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
  const userIndex = mockUsers.findIndex(user => user.id === userId)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
  return mockUsers[userIndex]
}

