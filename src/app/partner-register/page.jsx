'use client'

import Register from '@/components/Register'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="ml-[-120px] grid min-h-screen place-items-center">
      <h1>Partner Register Page</h1>
      <Register />
      <Link href="/onboarding">on board</Link>
    </main>
  )
}
