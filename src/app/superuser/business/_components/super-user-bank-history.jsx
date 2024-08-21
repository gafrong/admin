'use client'

import { BaseBankHistory } from '@/app/settings/business/_components/base-bank-history'
import React from 'react'
import { DEBUG_DeleteBankHistory } from './debug'

export function SuperUserBankHistory({ bankHistory }) {
  return (
    <BaseBankHistory bankHistory={bankHistory}>
      <div className="m-6 my-12">
        <DEBUG_DeleteBankHistory className="" />
      </div>
    </BaseBankHistory>
  )
}
