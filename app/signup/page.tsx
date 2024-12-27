'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { signUp } from '@/backend/lib/auth'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      // Here you would typically call your signup API
      await signUp({ email, password })
      router.push('/activate')
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/10 border-[#7F95EB]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white text-center">Sign up</CardTitle>
          <CardDescription className="text-white/70 text-center">Create your account & start building your digital shelf</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-transparent border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="bg-transparent border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="bg-transparent border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 text-white text-xl hover:bg-white/10 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-white text-center">
            Already have an account?{' '}
            <Link href="/signin" className="underline hover:text-white/80">
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
