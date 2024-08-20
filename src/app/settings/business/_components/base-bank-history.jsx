'use client'

import { DataCard } from '@/components/simple-table'
import { ifDate } from '@/lib/utils'
import React from 'react'

const headers = [
  { label: 'Bank', key: 'bankName' },
  { label: 'Account Name', key: 'accountName' },
  { label: 'Account Number', key: 'accountNumber' },
  { label: 'Date uploaded', key: 'uploadedAt' },
  { label: 'Date approved', key: 'approvedAt' },
]

export function BaseBankHistory({ bankHistory, children }) {
  const isBankHistory = bankHistory && bankHistory.length > 0

  if (!isBankHistory) {
    return null
  }

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
      {children}
    </DataCard>
  )
}
