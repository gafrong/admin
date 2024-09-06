'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  addMessageToVendorSupportQuery,
  useVendorSupportQuery,
  useVendorSupportQueryMessages,
} from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const replySchema = z.object({
  content: z.string().min(1, 'Reply is required'),
})

export default function VendorSupportQueryDetails() {
  const { data: session } = useSession()
  const params = useParams()
  const userRole = session?.user?.role
  const {
    data: query,
    error: queryError,
    isLoading: queryLoading,
    mutate: mutateQuery,
  } = useVendorSupportQuery(params.id)
  const {
    data: messages,
    error: messagesError,
    isLoading: messagesLoading,
    mutate: mutateMessages,
  } = useVendorSupportQueryMessages(params.id)

  const form = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      const messageData = {
        senderId: session?.user?.id,
        ...values,
      }
      await addMessageToVendorSupportQuery(
        params.id,
        messageData,
        session?.token,
      )
      form.reset()
      mutateMessages() // Refresh the messages
    } catch (error) {
      console.error('Error submitting reply:', error)
    }
  }

  if (queryLoading || messagesLoading) {
    return <div>Loading...</div>
  }

  if (queryError || messagesError) {
    return <div>Error: {queryError?.message || messagesError?.message}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Query Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>
            <strong>Subject:</strong> {query.subject}
          </p>
          <p>
            <strong>Status:</strong> {query.status}
          </p>
          <p>
            <strong>Message:</strong> {query.message}
          </p>
        </div>
        <h3 className="mb-2 text-lg font-semibold">Messages</h3>
        {messages?.length > 0 ?
          <ul className="mb-4 space-y-2">
            {messages.map((message, index) => (
              <li key={index} className="rounded bg-gray-100 p-2">
                <p>
                  <strong>
                    {message.senderId === session.user.id ? 'You' : 'Admin'}:
                  </strong>{' '}
                  {message.content}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        : <p className="mb-4">No messages yet.</p>}
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
