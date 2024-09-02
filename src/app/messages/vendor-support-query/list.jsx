'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function ListVendorSupportQueries() {
  const { data: session } = useSession()
  const [queries, setQueries] = useState([])

  useEffect(() => {
    // TODO: Implement the API call to fetch the list of queries
    // For now, we'll use dummy data
    setQueries([
      { id: 1, subject: 'Sample Query 1', status: 'Open' },
      { id: 2, subject: 'Sample Query 2', status: 'Closed' },
    ])
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Support Queries</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Subject</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id}>
              <td className="border p-2">{query.id}</td>
              <td className="border p-2">{query.subject}</td>
              <td className="border p-2">{query.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
