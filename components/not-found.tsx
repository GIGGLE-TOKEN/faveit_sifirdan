import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/">
          Go back home
        </Link>
      </Button>
    </div>
  )
}

