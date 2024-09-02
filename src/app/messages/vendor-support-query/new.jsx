'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function NewVendorSupportQuery() {
  const { data: session } = useSession()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement the API call to submit the new query
    console.log('Submitting new query:', { subject, message })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">New Support Query</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block mb-1">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Query
        </button>
      </form>
    </div>
  )
}
