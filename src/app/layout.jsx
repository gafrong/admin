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
            className={`w-34 fixed m-0 mt-16 h-full overflow-auto border-r border-slate-300 p-0`}
          >
            <Sidebar />
          </div>
          <div className={styles.content}>{children}</div>
        </body>
      </ProviderAuth>
    </html>
  )
}
