'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders } from './columns'

const dateRangePicker = 'dateCreated'

export default function Page() {
  const user = useUserStore((state) => state.user)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const vendorId = user?._id

  const getVendorProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseURL}products/admin/${vendorId}`)
      setProducts(response.data)
    } catch (error) {
      console.log('Product fetch error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (vendorId) {
      getVendorProduct()
    }
  }, [vendorId])

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>제품 편집 uu</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker, searchableColumnHeaders }}
        data={products}
        isLoading={loading}
      />
    </div>
  )
}
