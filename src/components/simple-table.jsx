'use client'

import { CardTitleDescription } from '@/app/settings/_components/card-title-description'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'

export function SimpleTable({ data, headers, title, className = '' }) {
  if (!data || data.length === 0) {
    return null
  }

  return (
    <Table className={className}>
      {title ?
        <TableCaption className="text-left">{title}</TableCaption>
      : null}
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, index) => {
          return (
            <TableRow key={index}>
              {headers.map((header, index) => (
                <TableCell key={index}>{item[header.key]}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export function DataCard({ data, headers, title, description, children }) {
  const isData = data && data.length > 0
  if (!isData) {
    return null
  }
  return (
    <Card className="relative mx-auto mt-10 max-w-screen-xl p-6 pt-0">
      <div className="">
        <CardTitleDescription title={title} description={description} />
        <div className="p-6">
          <SimpleTable data={data} headers={headers} />
        </div>
        {children}
      </div>
    </Card>
  )
}
