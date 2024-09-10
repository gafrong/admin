'use client'

import React from 'react'
import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import { DataTable } from '@/components/data-table/data-table'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import baseURL from '@/assets/common/baseUrl'
import { useSession } from 'next-auth/react'
import { getColumns, controls } from './columns'

export function VendorList() {
  const { toast } = useToast()
  const { data: session } = useSession()
  const { token } = session || {}

  const {
    data: vendors,
    isLoading,
    mutate: refetchVendors,
  } = useFetchAuth('vendor/all')
  console.log('<VendorList>', vendors)

  const handleDeleteVendor = async (userId) => {
    const URL_ENDPOINT = `${baseURL}vendor/${userId}`
    const headers = { Authorization: `Bearer ${token}` }
    
    try {
      const response = await axios.delete(URL_ENDPOINT, { headers })
      if (response.status === 200) {
        toast({
          title: "Vendor deleted",
          description: "The vendor has been successfully deleted.",
        })
        refetchVendors()
      }
    } catch (error) {
      console.error('Error deleting vendor:', error)
      if (error.response && error.response.status === 404) {
        toast({
          title: "Error",
          description: "Vendor not found. It may have already been deleted.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: `Failed to delete the vendor: ${error.message}`,
          variant: "destructive",
        })
      }
    }
  }

  const columns = getColumns(handleDeleteVendor)

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={vendors}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchVendors}
    />
  )
}

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>Vendors</PageTitle>
      <VendorList />
    </PageContainer>
  )
}
