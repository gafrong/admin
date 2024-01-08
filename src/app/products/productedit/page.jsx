'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
    <>
      {loading ?
        <LoadingSpinner />
      : <div className="pl-5 pt-5">
          <h1>Product Edit Page</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Product</TableHead>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            {products?.length > 0 &&
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={awsURL + product.image}
                      alt={`Product ${index}`}
                      className="h-12 w-12 rounded-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="mt-2 pl-5">{product.name}</div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: '/products/productdetail',
                        query: { product: JSON.stringify(product) },
                      }}
                    >
                      edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </Table>
        </div>
      }
    </>
  )
}
