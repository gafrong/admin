'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import io from 'socket.io-client'

let socket

export default function ListVendorSupportQueries() {
  const { data: session } = useSession()
  const [queries, setQueries] = useState([])

  useEffect(() => {
    // Connect to the WebSocket server
    socket = io()

    // Fetch initial queries
    fetchQueries()

    // Listen for real-time updates
    socket.on('new-query', (newQuery) => {
      setQueries((prevQueries) => [...prevQueries, newQuery])
    })

    socket.on('update-query', (updatedQuery) => {
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.id === updatedQuery.id ? updatedQuery : query
        )
      )
    })

    return () => {
      if (socket) socket.disconnect()
    }
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
