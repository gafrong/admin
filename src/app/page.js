'use client'

import Login from '@/components/Login'
import { PageTitle } from '@/components/typography/PageTitle'

export default function Home() {
  return (
    <div className="-ml-40 mt-14 grid place-items-center items-start">
      <PageTitle>Login</PageTitle>
      <Login />
    </div>
  )
}
