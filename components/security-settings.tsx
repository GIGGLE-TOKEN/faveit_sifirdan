'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white dark:text-[#E7E9EA]">Security and Account Access</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor" className="text-white dark:text-[#E7E9EA]">Two-Factor Authentication</Label>
          <Switch
            id="two-factor"
            checked={twoFactor}
            onCheckedChange={setTwoFactor}
          />
        </div>

        <Button variant="outline" className="w-full text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336] hover:bg-white/10 dark:hover:bg-[#2F3336]">
          Manage Devices
        </Button>

        <Button variant="outline" className="w-full text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336] hover:bg-white/10 dark:hover:bg-[#2F3336]">
          View Account Access History
        </Button>

        <Button variant="outline" className="w-full text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336] hover:bg-white/10 dark:hover:bg-[#2F3336]">
          Manage Connected Apps
        </Button>
      </div>
    </div>
  )
}

