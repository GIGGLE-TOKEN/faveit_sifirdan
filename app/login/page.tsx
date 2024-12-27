'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-medium text-[#091747] text-center mb-16">
          Login to your account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-white">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              required
              aria-label="Email address"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              required
              aria-label="Password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center" aria-live="assertive">{error}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-transparent border border-white/30 rounded-full px-6 py-4 text-white text-xl hover:bg-white/10 transition-colors mt-8"
          >
            Confirm
          </button>
        </form>

        <div className="space-y-4 text-center">
          <p className="text-white text-xl">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline hover:text-white/80">
              Sign up here
            </Link>
            .
          </p>
          
          <Link 
            href="/forgot-password" 
            className="text-white italic hover:text-white/80 block text-xl"
          >
            Forgot my password
          </Link>
        </div>
      </div>
    </div>
  )
}

