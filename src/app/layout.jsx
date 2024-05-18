import './globals.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { ProviderAuth } from './provider-auth'

export default async function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head />
      <ProviderAuth>
        <body>
          <Navbar />
          <Sidebar />
          <div className="ml-40 border-0 pr-5 pt-20">{children}</div>
          <Toaster />
        </body>
      </ProviderAuth>
    </html>
  )
}
