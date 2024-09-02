'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ListVendorSupportQueries() {
  const { data: session } = useSession()
  const [queries, setQueries] = useState([])

  useEffect(() => {
    fetchQueries()
  }, [])

  const fetchQueries = async () => {
    try {
      const response = await fetch('/api/vendor-support-queries')
      if (response.ok) {
        const data = await response.json()
        setQueries(data)
      } else {
        console.error('Failed to fetch queries')
      }
    } catch (error) {
      console.error('Error fetching queries:', error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Support Queries</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Subject</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id}>
              <td className="border p-2">{query.id}</td>
              <td className="border p-2">{query.subject}</td>
              <td className="border p-2">{query.status}</td>
              <td className="border p-2">
                <Link href={`/messages/vendor-support-query/${query.id}`}>
                  <a className="text-blue-500 hover:underline">View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
