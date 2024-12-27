import { NavigationBar } from "@/components/navigation_bar"
import { SettingsNav } from "./components/settings-nav"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] dark:bg-black">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <SettingsNav />
        <main className="flex-1 bg-white/10 dark:bg-[#000000] rounded-lg p-6">
          {children}
        </main>
      </div>
      <NavigationBar />
    </div>
  )
}

