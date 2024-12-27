import { useEffect, useRef } from 'react'

// Announce dynamic content changes
export function LiveRegion({ message }: { message: string }) {
  return (
    <div aria-live="polite" className="sr-only">
      {message}
    </div>
  )
}

// Improve focus management
export function FocusManager({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const focusableElements = ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus()
    }
  }, [])

  return <div ref={ref}>{children}</div>
}

// Add skip link for keyboard users
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
    >
      Skip to main content
    </a>
  )
}

// Improve ARIA labels
export function AriaLabelledBy({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <>
      <span id={id} className="sr-only">
        {label}
      </span>
      <div aria-labelledby={id}>{children}</div>
    </>
  )
}

