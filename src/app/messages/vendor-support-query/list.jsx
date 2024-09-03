'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useVendorSupportQueries } from '@/lib/api'

export default function ListVendorSupportQueries() {
  const { data: session, status } = useSession()
  const { data: queries, error, isLoading } = useVendorSupportQueries(session?.user?.id)

  if (status === 'loading' || isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!session) return <div>Please sign in to view your support queries.</div>
console.log({queries})
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Queries</CardTitle>
      </CardHeader>
      <CardContent>
        {queries && queries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query Type</TableHead>
                <TableHead>Last Message</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query._id}>
                  <TableCell>{query.queryType}</TableCell>
                  <TableCell>{new Date(query.lastMessage).toLocaleString()}</TableCell>
                  <TableCell>{new Date(query.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button asChild variant="link">
                      <Link href={`/messages/vendor-support-query/${query._id}`}>
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No support queries found.</p>
        )}
      </CardContent>
    </Card>
  )
}
