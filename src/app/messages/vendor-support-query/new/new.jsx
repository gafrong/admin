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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createVendorSupportQuery } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const subjectOptions = [
  { value: 'Product', label: 'Product Query' },
  { value: 'Customer', label: 'Customer Query' },
  { value: 'Settlement', label: 'Settlement Query' },
  { value: 'Order', label: 'Order Query' },
  { value: 'Video', label: 'Video Query' },
]

const formSchema = z.object({
  queryType: z.enum(['Product', 'Customer', 'Settlement', 'Order', 'Video'], {
    required_error: 'Please select a query type',
  }),
  initialMessage: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message must be less than 1000 characters'),
})

export default function NewVendorSupportQuery() {
  const { data: session } = useSession()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      queryType: '',
      initialMessage: '',
    },
  })

  const onSubmit = async (values) => {
    if (!session || !session.user) {
      console.error('No session or user found')
      return
    }
    const data = {
      queryType: values.queryType,
      initialMessage: values.initialMessage,
    }
    try {
      if (!session.token) {
        console.error('No access token found in session')
        return
      }
      await createVendorSupportQuery(data, session.token)
      router.push('/messages/vendor-support-query')
    } catch (error) {
      console.error('Error submitting query:', error)
      console.error('Error details:', error.response?.data)
      // You might want to show an error message to the user here
    }
  }

  return (
    <Card className="pt-4">
      {/* <CardHeader>
        <CardTitle>New Support Query</CardTitle>
      </CardHeader> */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="queryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Query Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Query</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
