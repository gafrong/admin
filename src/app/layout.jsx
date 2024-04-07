import './globals.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { ProviderAuth } from './provider-auth'
import styles from './utils.module.css'

export default async function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head />
      <ProviderAuth>
        <body>
          <Navbar />
          <div
            className={`fixed m-0 mt-20 h-full w-40 overflow-auto border-r border-slate-300 p-0`}
          >
            <Sidebar />
          </div>
          <div className="ml-40 border-0 pt-[79px]">{children}</div>
        </body>
      </ProviderAuth>
    </html>
  )
}
