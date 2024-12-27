'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccountSettings() {
  const [username, setUsername] = useState('johndoe')
  const [email, setEmail] = useState('john@example.com')
  const [phone, setPhone] = useState('+1234567890')
  const [language, setLanguage] = useState('en')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="username" className="text-white dark:text-[#E7E9EA]">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white dark:text-[#E7E9EA]">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-white dark:text-[#E7E9EA]">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]"
          />
        </div>

        <div>
          <Label htmlFor="language" className="text-white dark:text-[#E7E9EA]">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white dark:text-[#E7E9EA]">Account Actions</h3>
        <Button variant="outline" className="w-full text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336] hover:bg-white/10 dark:hover:bg-[#2F3336]">
          Change Password
        </Button>
        <Button variant="outline" className="w-full text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336] hover:bg-white/10 dark:hover:bg-[#2F3336]">
          Download Your Data
        </Button>
        <Button variant="destructive" className="w-full">
          Deactivate Account
        </Button>
      </div>
    </div>
  )
}

