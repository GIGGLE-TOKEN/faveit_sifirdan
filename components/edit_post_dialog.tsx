'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FavoriteType } from "@/types"
import { useFocusTrap } from '@/hooks/use-focus-trap'

interface EditPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: FavoriteType
  item: { title: string; link: string } | null
  onComplete: () => void
}

export function EditPostDialog({ open, onOpenChange, type, item, onComplete }: EditPostDialogProps) {
  const [content, setContent] = useState('')
  const router = useRouter()
  const focusTrapRef = useFocusTrap(open)

  const handleSubmit = async () => {
    if (!item) return

    // Here you would typically make an API call to create the post
    // For now, we'll just simulate it
    console.log('Creating post:', {
      content,
      favoriteItem: {
        type,
        title: item.title,
        link: item.link
      }
    })

    onOpenChange(false)
    onComplete()
    router.push('/')
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} aria-label="Edit post">
      <DialogContent className="bg-gradient-to-b from-[#6B5B95] to-[#45356E] dark:bg-black border-0">
        <div ref={focusTrapRef}>
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              className="absolute right-4 top-4 text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <h2 className="text-2xl font-semibold text-white text-center mt-8">How was it?</h2>

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Parent group's Feed Item's Description"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 min-h-[120px] rounded-xl"
            />

            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 gap-2"
                onClick={handleSubmit}
              >
                <span>FaveIt</span>
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

