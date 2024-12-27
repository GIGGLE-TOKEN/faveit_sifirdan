'use client'

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusCircle, User, MessageSquare, Bell, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"
import { AddFavoriteDialog } from "./add_favorite_dialog"
import { ThemeToggle } from "./theme_toggle"
import { SkipLink } from "./accessibility_improvements"
import { useSession } from "next-auth/react"
import { useNotifications } from "@/contexts/NotificationContext"
import React from 'react'

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/discover", icon: Search, label: "Discover" },
  { href: "#", icon: PlusCircle, label: "Add" },
  { href: "/inbox", icon: MessageSquare, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function NavigationBar() {
  const pathname = usePathname()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const sessionResult = useSession()
  const { unreadCount } = useNotifications()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const focusableElements = navRef.current?.querySelectorAll('a, button') || []
        const focusedElement = document.activeElement
        const currentIndex = Array.from(focusableElements).indexOf(focusedElement as Element)
        let nextIndex

        if (e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length
        } else {
          nextIndex = (currentIndex + 1) % focusableElements.length
        }

        (focusableElements[nextIndex] as HTMLElement).focus()
      }
    }

    navRef.current?.addEventListener('keydown', handleKeyDown)
    return () => navRef.current?.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <SkipLink />
      <nav ref={navRef} className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#FFFFFF] to-[#AAAAAA] dark:bg-black dark:from-black dark:to-black py-3 px-4" aria-label="Main Navigation">
        <div className="container max-w-2xl mx-auto flex justify-between items-center">
          {navItems.map(({ href, icon: Icon, label }) => {
            if (label === "Add") {
              return (
                <button
                  key={label}
                  onClick={() => setShowAddDialog(true)}
                  className="w-12 h-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#091747] dark:focus:ring-[#657786]"
                  aria-label="Add new favorite"
                >
                  <Icon 
                    className={cn(
                      "w-8 h-8 text-[#091747] dark:text-white",
                      showAddDialog && "dark:fill-white"
                    )} 
                    aria-hidden="true" 
                  />
                  <span className="sr-only">{label}</span>
                </button>
              )
            }

            if (label === "Notifications") {
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative flex items-center justify-center w-8 h-8 text-[#091747] dark:text-[#657786] focus:outline-none focus:ring-2 focus:ring-[#091747] dark:focus:ring-[#657786] rounded-full",
                    pathname === href && "text-[#17DB4E] dark:text-white"
                  )}
                  aria-label={`${unreadCount ? `${unreadCount} unread notifications` : 'Notifications'}`}
                >
                  <Icon 
                    className={cn(
                      "w-6 h-6 stroke-current",
                      pathname === href ? "dark:text-white" : "text-[#091747] dark:text-[#657786]"
                    )} 
                    aria-hidden="true" 
                  />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1DA1F2] rounded-full text-xs text-white flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                  <span className="sr-only">{label}</span>
                </Link>
              )
            }

            return (
              <Link 
                key={href}
                href={href}
                className={cn(
                  "flex items-center justify-center w-8 h-8 text-[#091747] dark:text-[#657786] focus:outline-none focus:ring-2 focus:ring-[#091747] dark:focus:ring-[#657786] rounded-full",
                  pathname === href && "text-[#17DB4E] dark:text-white"
                )}
                aria-current={pathname === href ? "page" : undefined}
                aria-label={label === "Messages" ? "Go to Inbox" : label}
              >
                <Icon 
                  className={cn(
                    "w-6 h-6 stroke-current",
                    pathname === href ? "dark:text-white" : "text-[#091747] dark:text-[#657786]"
                  )} 
                  aria-hidden="true" 
                />
                <span className="sr-only">{label}</span>
              </Link>
            )
          })}
          <ThemeToggle />
        </div>
      </nav>

      <AddFavoriteDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </>
  )
}

