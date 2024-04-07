'use client'

import Register from '@/components/Register'
import { PageTitle } from '@/components/typography/PageTitle'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen-off -ml-40 mt-14 grid place-items-center">
      <PageTitle>Partner Register Page</PageTitle>
      <Register />
      <Link href="/onboarding">on board</Link>
    </main>
  )
}
