import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SocialProvider } from '@/contexts/SocialContext'
import { WebSocketProvider } from '@/contexts/WebSocketContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { AuthProvider } from "@/components/providers/auth-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Platform',
  description: 'A modern social media platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <WebSocketProvider>
            <NotificationProvider>
              <SocialProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </SocialProvider>
            </NotificationProvider>
          </WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

