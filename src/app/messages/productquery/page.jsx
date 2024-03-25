'use client'

import { PageTitle } from '@/components/typography/PageTitle'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { TableProductQuery } from './table-product-query'

export default function Page() {
  const router = useRouter()

  const BackButton = () => (
    <Button
      className="mr-auto h-8 w-10 p-0 pr-2"
      onClick={() => {
        router.back()
      }}
      size="sm"
      variant="ghost"
    >
      <FiArrowLeftCircle size={24} />
    </Button>
  )

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>
        <BackButton />
        고객 문의
      </PageTitle>
      <TableProductQuery />
    </div>
  )
}
