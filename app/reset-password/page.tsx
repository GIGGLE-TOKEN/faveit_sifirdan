'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Here you would typically call your API to initiate the password reset process
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] flex flex-col items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/10 border-[#7F95EB]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">Check Your Email</CardTitle>
            <CardDescription className="text-white/70 text-center">
              We've sent password reset instructions to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-white mb-4">
              If you don't see the email, please check your spam folder.
            </p>
            <Button 
              onClick={() => router.push('/signin')}
              className="bg-transparent border border-white/30 rounded-full px-6 py-2 text-white hover:bg-white/10 transition-colors"
            >
              Return to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/10 border-[#7F95EB]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white text-center">Reset Password</CardTitle>
          <CardDescription className="text-white/70 text-center">
            Enter your email address and we'll send you instructions to reset your password.
          </CardDescription>
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
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/signin" className="text-white/70 text-sm hover:text-white underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

