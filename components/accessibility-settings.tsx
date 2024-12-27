'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function AccessibilitySettings() {
  const [increaseContrast, setIncreaseContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [theme, setTheme] = useState('system')

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white dark:text-[#E7E9EA]">Accessibility, Display, and Languages</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="increase-contrast" className="text-white dark:text-[#E7E9EA]">Increase Color Contrast</Label>
          <Switch
            id="increase-contrast"
            checked={increaseContrast}
            onCheckedChange={setIncreaseContrast}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="reduce-motion" className="text-white dark:text-[#E7E9EA]">Reduce Motion</Label>
          <Switch
            id="reduce-motion"
            checked={reduceMotion}
            onCheckedChange={setReduceMotion}
          />
        </div>

        <div>
          <Label htmlFor="font-size" className="text-white dark:text-[#E7E9EA]">Font Size</Label>
          <Slider
            id="font-size"
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="mt-2"
          />
          <span className="text-sm text-white dark:text-[#E7E9EA] mt-1 block">{fontSize}px</span>
        </div>

        <div>
          <Label htmlFor="theme" className="text-white dark:text-[#E7E9EA]">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme" className="bg-white/10 dark:bg-[#2F3336] text-white dark:text-[#E7E9EA] border-white/20 dark:border-[#2F3336]">
              <SelectValue placeholder="Choose a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

