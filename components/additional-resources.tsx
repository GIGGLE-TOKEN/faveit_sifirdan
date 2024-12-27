import Link from 'next/link'

export function AdditionalResources() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white dark:text-[#E7E9EA]">Additional Resources</h2>
      
      <div className="space-y-4">
        <Link href="/terms" className="block text-[#7F95EB] dark:text-[#1DA1F2] hover:underline">
          Terms of Service
        </Link>
        <Link href="/privacy" className="block text-[#7F95EB] dark:text-[#1DA1F2] hover:underline">
          Privacy Policy
        </Link>
        <Link href="/cookies" className="block text-[#7F95EB] dark:text-[#1DA1F2] hover:underline">
          Cookie Policy
        </Link>
        <Link href="/help" className="block text-[#7F95EB] dark:text-[#1DA1F2] hover:underline">
          Help Center
        </Link>
      </div>
    </div>
  )
}

