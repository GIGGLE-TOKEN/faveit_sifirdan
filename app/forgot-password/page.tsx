'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authStyles } from '@/styles/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle forgot password logic here
    console.log('Forgot Password:', { email })
    // Simulate email sent
    alert('If an account exists with this email, you will receive a password reset link.')
    router.push('/login')
  }

  return (
    <div className={authStyles.background}>
      <div className={authStyles.container}>
        <h1 className={authStyles.title}>Forgot your password?</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={authStyles.input}
              required
            />
          </div>
          <button type="submit" className={authStyles.button}>
            Send Reset Link
          </button>
        </form>
        <Link href="/login" className={authStyles.link}>
          Back to login
        </Link>
      </div>
    </div>
  )
}

