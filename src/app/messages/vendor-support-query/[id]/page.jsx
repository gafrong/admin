'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

export default function VendorSupportQueryDetails() {
  const { data: session } = useSession()
  const params = useParams()
  const [query, setQuery] = useState(null)
  const [reply, setReply] = useState('')

  useEffect(() => {
    fetchQueryDetails()
  }, [params.id])

  const fetchQueryDetails = async () => {
    try {
      const response = await fetch(`/api/vendor-support-queries/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setQuery(data)
      } else {
        console.error('Failed to fetch query details')
      }
    } catch (error) {
      console.error('Error fetching query details:', error)
    }
  }

  const handleReply = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/vendor-support-queries/${params.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply }),
      })

      if (response.ok) {
        setReply('')
        fetchQueryDetails() // Refresh the query details
      } else {
        console.error('Failed to submit reply')
      }
    } catch (error) {
      console.error('Error submitting reply:', error)
    }
  }

  if (!query) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Query Details</h2>
      <div className="mb-4">
        <p><strong>Subject:</strong> {query.subject}</p>
        <p><strong>Status:</strong> {query.status}</p>
        <p><strong>Message:</strong> {query.message}</p>
      </div>
      <h3 className="text-lg font-semibold mb-2">Replies</h3>
      {query.replies && query.replies.length > 0 ? (
        <ul className="mb-4">
          {query.replies.map((reply, index) => (
            <li key={index} className="mb-2">
              <p><strong>{reply.isAdmin ? 'Admin' : 'You'}:</strong> {reply.message}</p>
              <p className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4">No replies yet.</p>
      )}
      <form onSubmit={handleReply} className="space-y-4">
        <div>
          <label htmlFor="reply" className="block mb-1">Your Reply</label>
          <textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Reply
        </button>
      </form>
    </div>
  )
}
