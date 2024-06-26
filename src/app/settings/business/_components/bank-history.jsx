'use client'

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
import { format } from 'date-fns'
import React from 'react'
import { CardTitleDescription } from '../../_components/card-title-description'

function ifDate(date, msg = '') {
  return date ? format(new Date(date), 'dd/MM/yyyy') : msg
}
export function BankHistoryTable({ bankHistory }) {
  return (
    <>
      {/* <pre>{JSON.stringify(bankHistory, null, 2)}</pre> */}
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Bank</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Date uploaded</TableHead>
            <TableHead>Date approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bankHistory.map((history, index) => (
            <TableRow key={index}>
              <TableCell>{history.bankName}</TableCell>
              <TableCell>{history.accountName}</TableCell>
              <TableCell>{history.accountNumber}</TableCell>
              <TableCell>{ifDate(history.uploadedAt)}</TableCell>
              <TableCell>{ifDate(history.approvedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export function BankHistory({ bankHistory }) {
  const isBankHistory = bankHistory && bankHistory.length > 0
  if (!isBankHistory) {
    return null
  }
  return (
    <Card className="relative mx-auto mt-10 max-w-screen-xl p-6 pt-0">
      <div className="">
        <CardTitleDescription
          title="Bank History"
          description="History of changes made to the bank account"
        />
        <div className="p-6">
          <BankHistoryTable bankHistory={bankHistory} />
        </div>
      </div>
    </Card>
  )
}
