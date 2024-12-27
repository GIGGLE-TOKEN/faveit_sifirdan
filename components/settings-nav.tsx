'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const settingsSections = [
  { name: 'Your Account', href: '/settings' },
  { name: 'Security and Account Access', href: '/settings/security' },
  { name: 'Privacy and Safety', href: '/settings/privacy' },
  { name: 'Notifications', href: '/settings/notifications' },
  { name: 'Accessibility, Display, and Languages', href: '/settings/accessibility' },
  { name: 'Additional Resources', href: '/settings/resources' },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="w-full md:w-64 mb-8 md:mb-0">
      <ul className="space-y-2">
        {settingsSections.map((section) => (
          <li key={section.name}>
            <Link
              href={section.href}
              className={cn(
                "block py-2 px-4 rounded-lg text-white dark:text-[#E7E9EA] hover:bg-white/10 dark:hover:bg-[#2F3336]",
                pathname === section.href && "bg-white/20 dark:bg-[#2F3336]"
              )}
            >
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

