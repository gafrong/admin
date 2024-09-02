'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { getVendorSupportQueries } from '@/lib/api'

export default function ListVendorSupportQueries() {
  const { data: session } = useSession()
  const [queries, setQueries] = useState([])

  useEffect(() => {
    if (session?.user?.id) {
      fetchQueries(session.user.id)
    }
  }, [session])

  const fetchQueries = async (userId) => {
    try {
      const data = await getVendorSupportQueries(userId)
      setQueries(data)
    } catch (error) {
      console.error('Error fetching queries:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queries.map((query) => (
              <TableRow key={query.id}>
                <TableCell>{query.id}</TableCell>
                <TableCell>{query.subject}</TableCell>
                <TableCell>{query.status}</TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <Link href={`/messages/vendor-support-query/${query.id}`}>
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
