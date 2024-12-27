'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PrivacySettings() {
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowDMs, setAllowDMs] = useState('everyone')

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white dark:text-[#E7E9EA]">Privacy and Safety</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="private-account" className="text-white dark:text-[#E7E9EA]">Private Account</Label>
          <Switch
            id="private-account"
            checked={privateAccount}
            onCheckedChange={setPrivateAccount}
          />
        </div>

        <div>
          <Label htmlFor="allow-dms" className="text-white dark:text-[#E7E9EA]">Allow Direct Messages</Label>
          <Select value={allowDMs} onValueChange={setAllowDMs}>
            <SelectTrigger id="allow-dms" className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]">
              <SelectValue placeholder="Who can send you DMs?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>
              <SelectItem value="followers">Followers only</SelectItem>
              <SelectItem value="nobody">Nobody</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="data-sharing" className="text-white dark:text-[#E7E9EA]">Data Sharing with Business Partners</Label>
          <Switch id="data-sharing" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="location-info" className="text-white dark:text-[#E7E9EA]">Share Location Information</Label>
          <Switch id="location-info" />
        </div>
      </div>
    </div>
  )
}

