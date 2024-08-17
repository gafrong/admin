'use client'

import { DEBUG_DeleteBankHistory } from '@/app/settings/business/_components/debug'
import { DataCard } from '@/components/simple-table'
import { format } from 'date-fns'
import React from 'react'

export function ifDate(date, msg = '') {
  return date ? format(new Date(date), 'dd.MM.yyyy') : msg
}

export function BankHistory({ bankHistory }) {
  const isBankHistory = bankHistory && bankHistory.length > 0

  if (!isBankHistory) {
    return null
  }

  const headers = [
    { label: 'Bank', key: 'bankName' },
    { label: 'Account Name', key: 'accountName' },
    { label: 'Account Number', key: 'accountNumber' },
    { label: 'Date uploaded', key: 'uploadedAt' },
    { label: 'Date approved', key: 'approvedAt' },
  ]

  const formattedBankHistory = bankHistory.map((item) => ({
    ...item,
    uploadedAt: ifDate(item.uploadedAt),
    approvedAt: ifDate(item.approvedAt),
  }))

  return (
    <DataCard
      data={formattedBankHistory}
      description="History of changes made to the bank account"
      headers={headers}
      title="Bank History"
    >
      <div className="m-6 my-12">
        <DEBUG_DeleteBankHistory className="" />
      </div>
    </DataCard>
  )
}
