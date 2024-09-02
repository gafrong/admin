'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NewVendorSupportQuery from './new'
import ListVendorSupportQueries from './list'

export default function VendorSupportQueryPage({ params }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentView, setCurrentView] = useState('list')

  React.useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session) {
      router.push('/') // Redirect to home if not logged in
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null // This will prevent any flash of content before redirect
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Support Query</h1>
      <div className="mb-4">
        <button
          onClick={() => setCurrentView('list')}
          className={`mr-2 px-4 py-2 rounded ${
            currentView === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          List Queries
        </button>
        <button
          onClick={() => setCurrentView('new')}
          className={`px-4 py-2 rounded ${
            currentView === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          New Query
        </button>
      </div>
      {currentView === 'new' ? <NewVendorSupportQuery /> : <ListVendorSupportQueries />}
    </div>
  )
}
