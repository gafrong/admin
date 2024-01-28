'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import LoadingSpinner from '@/components/LoadingSpinner'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders } from './columns'

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

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="py-10 pl-5 pr-2">
      <h1 className="scroll-m-20 pb-8 text-2xl font-extrabold tracking-tight lg:text-2xl">
        Edit Product
      </h1>
      <DataTable
        columns={columns}
        data={products}
        searchableColumnHeaders={searchableColumnHeaders}
      />
    </div>
  )
}
