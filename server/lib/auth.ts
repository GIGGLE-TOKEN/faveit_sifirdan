'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const retypePassword = formData.get('retypePassword') as string

  if (!email || !password || !retypePassword) {
    throw new Error('All fields are required')
  }

  if (password !== retypePassword) {
    throw new Error('Passwords do not match')
  }

  try {
    // In a real app, you would hash the password and call your API
    // For now, we'll simulate the signup process
    console.log('Signing up user:', email)
    
    // Store email for activation
    ;(await
      // Store email for activation
      cookies()).set('pendingActivation', email)
    
    // Redirect to activation page
    redirect('/activate')
  } catch (error) {
    throw new Error('Failed to create account')
  }
}

