'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ForwardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ForwardDialog({
  open,
  onOpenChange
}: ForwardDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black border-0">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white dark:text-[#E7E9EA]">Forward</h2>
            <Button
              variant="ghost"
              className="text-white dark:text-[#E7E9EA] hover:bg-white/10 dark:hover:bg-[#2F3336]"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search username"
            className="bg-white/10 dark:bg-[#273340] border-white/20 dark:border-[#2F3336] text-white dark:text-[#E7E9EA] placeholder:text-white/70 dark:placeholder:text-[#657786]"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

