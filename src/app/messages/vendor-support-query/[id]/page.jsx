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
import { getVendorSupportQuery, addMessageToVendorSupportQuery, getMessagesForVendorSupportQuery } from '@/lib/api'

const replySchema = z.object({
  content: z.string().min(1, 'Reply is required'),
})

export default function VendorSupportQueryDetails() {
  const { data: session } = useSession()
  const params = useParams()
  const [query, setQuery] = useState(null)
  const [messages, setMessages] = useState([])

  const form = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: '',
    },
  })

  useEffect(() => {
    fetchQueryDetails()
    fetchMessages()
  }, [params.id])

  const fetchQueryDetails = async () => {
    try {
      const data = await getVendorSupportQuery(params.id)
      setQuery(data)
    } catch (error) {
      console.error('Error fetching query details:', error)
    }
  }

  const fetchMessages = async () => {
    try {
      const data = await getMessagesForVendorSupportQuery(params.id)
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const onSubmit = async (values) => {
    try {
      await addMessageToVendorSupportQuery(params.id, {
        senderId: session.user.id,
        ...values,
      })
      form.reset()
      fetchMessages() // Refresh the messages
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
        <h3 className="text-lg font-semibold mb-2">Messages</h3>
        {messages.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {messages.map((message, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <p><strong>{message.senderId === session.user.id ? 'You' : 'Admin'}:</strong> {message.content}</p>
                <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">No messages yet.</p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
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
