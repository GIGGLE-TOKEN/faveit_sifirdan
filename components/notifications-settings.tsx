'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationsSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState('realtime')

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white dark:text-[#E7E9EA]">Notifications</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications" className="text-white dark:text-[#E7E9EA]">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications" className="text-white dark:text-[#E7E9EA]">Push Notifications</Label>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>

        <div>
          <Label htmlFor="notification-frequency" className="text-white dark:text-[#E7E9EA]">Notification Frequency</Label>
          <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
            <SelectTrigger id="notification-frequency" className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]">
              <SelectValue placeholder="Select notification frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time</SelectItem>
              <SelectItem value="hourly">Hourly digest</SelectItem>
              <SelectItem value="daily">Daily digest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

