'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const replySchema = z.object({
  reply: z.string().min(1, 'Reply is required'),
})

export default function VendorSupportQueryDetails() {
  const { data: session } = useSession()
  const params = useParams()
  const [query, setQuery] = useState(null)

  const form = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: {
      reply: '',
    },
  })

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

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`/api/vendor-support-queries/${params.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        form.reset()
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
    <Card>
      <CardHeader>
        <CardTitle>Query Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p><strong>Subject:</strong> {query.subject}</p>
          <p><strong>Status:</strong> {query.status}</p>
          <p><strong>Message:</strong> {query.message}</p>
        </div>
        <h3 className="text-lg font-semibold mb-2">Replies</h3>
        {query.replies && query.replies.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {query.replies.map((reply, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <p><strong>{reply.isAdmin ? 'Admin' : 'You'}:</strong> {reply.message}</p>
                <p className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">No replies yet.</p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Reply</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your reply" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send Reply</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
