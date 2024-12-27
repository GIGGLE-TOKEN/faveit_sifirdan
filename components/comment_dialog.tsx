'use client'

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComment: (comment: string) => void
}

export function CommentDialog({
  open,
  onOpenChange,
  onComment
}: CommentDialogProps) {
  const [comment, setComment] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black border-0 text-white dark:text-[#E7E9EA]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Add a comment</h2>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What are your thoughts?"
            className="bg-white/10 dark:bg-[#273340] border-white/20 dark:border-[#2F3336] text-white dark:text-[#E7E9EA] placeholder:text-white/70 dark:placeholder:text-[#657786]"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                onComment(comment)
                setComment('')
              }}
              className="bg-[#7F95EB] dark:bg-[#1DA1F2] text-white hover:bg-[#7F95EB]/80 dark:hover:bg-[#1DA1F2]/80"
            >
              Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

