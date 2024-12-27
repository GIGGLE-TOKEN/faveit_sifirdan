'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActivatePage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingActivation')
    if (pendingEmail) {
      setEmail(pendingEmail)
    } else {
      router.push('/signup')
    }
  }, [router])

  const handleActivate = () => {
    // In a real app, this would verify the activation code
    console.log('Activating account for:', email)
    localStorage.removeItem('pendingActivation')
    router.push('/complete-profile')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 border-[#7F95EB]">
        <CardHeader>
          <CardTitle className="text-white text-center">Activate your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white text-center">
            An activation link has been sent to {email}. 
            Please check your email and click the link to activate your account.
          </p>
          <Button 
            onClick={handleActivate}
            className="w-full bg-[#7F95EB] hover:bg-[#7F95EB]/90 text-white"
          >
            I've activated my account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

