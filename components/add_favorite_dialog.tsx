'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import { useFocusTrap } from '@/hooks/use-focus-trap'
import { searchByType } from '@/lib/services/search'
import { EditPostDialog } from './edit_post_dialog'
import type { FavoriteType } from "@/types"

interface SearchResult {
  id: string
  title: string
  year?: string
  link: string
}

interface AddFavoriteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddFavoriteDialog({ open, onOpenChange }: AddFavoriteDialogProps) {
  const [type, setType] = useState<FavoriteType>('Movie')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null)
  const [showEditPost, setShowEditPost] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 300)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    const results = await searchByType(type, query)
    setSearchResults(results)
  }

  const handleSelectItem = (item: SearchResult) => {
    setSelectedItem(item)
    setSearchTerm(item.title)
    setSearchResults([])
  }

  const handleFaveIt = () => {
    if (selectedItem) {
      setShowEditPost(true)
      onOpenChange(false)
    }
  }

  const focusTrapRef = useFocusTrap(open)

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} aria-label="Add favorite item">
        <DialogContent className="bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black border-0 dark:border-[#2F3336] w-[90%] max-w-[400px] p-4 min-h-[80vh] sm:min-h-[70vh]">
          <div ref={focusTrapRef}>
            <div className="space-y-6 sm:space-y-8">
              <div className="flex justify-start items-center mb-6">
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 dark:text-[#657786] dark:hover:bg-[#2F3336] px-0"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              </div>

              <Select onValueChange={(value: string) => setType(value as FavoriteType)}>
                <SelectTrigger className="w-full border border-white/30 dark:border-[#2F3336] text-white dark:text-[#E7E9EA] bg-transparent">
                  <SelectValue placeholder="Choose Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="Series">Series</SelectItem>
                  <SelectItem value="Book">Book</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Input
                  placeholder="Search title..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    handleSearch(e.target.value)
                  }}
                  className="w-full border border-white/30 dark:border-[#2F3336] text-white dark:text-[#E7E9EA] bg-transparent placeholder:text-white/70 dark:placeholder:text-[#A1A1AA]"
                />
                {searchResults.length > 0 && (
                  <div className="absolute w-full mt-1 bg-white/10 dark:bg-[#2F3336] rounded-md border border-white/30 dark:border-[#2F3336] max-h-[40vh] overflow-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="w-full px-3 py-2 text-left text-white dark:text-[#E7E9EA] hover:bg-white/10 dark:hover:bg-[#2F3336]"
                        onClick={() => handleSelectItem(result)}
                      >
                        {result.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="hidden"
                value={selectedItem?.link || ''}
                name="selectedItemLink"
              />
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 dark:text-[#657786] dark:hover:bg-[#2F3336]"
                  onClick={handleFaveIt}
                  disabled={!selectedItem}
                >
                  <span className="mr-2">FaveIt</span>
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditPostDialog
        open={showEditPost}
        onOpenChange={setShowEditPost}
        type={type}
        item={selectedItem}
        onComplete={() => {
          setSelectedItem(null)
          setSearchTerm('')
          setType('Movie')
        }}
      />
    </>
  )
}

