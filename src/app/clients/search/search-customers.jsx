'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders } from './columns'

export function SearchCustomers() {
  const token = useUserStore((state) => state?.token)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [isFetchTriggered, setFetchTrigger] = useState(false)

  const getUsers = async () => {
    setIsLoading(true)
    const URL = `${baseURL}users/`
    try {
      const response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      setUsers(response.data)
    } catch (error) {
      console.log('getUsers() error', { URL }, error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [token, isFetchTriggered])

  const refetchTableData = () => {
    setFetchTrigger((prev) => !prev)
  }

  const controls = {
    dateRangePicker: 'username',
    isSearchAlwaysShown: true,
    searchableColumnHeaders,
  }

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={users}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchTableData}
    />
  )
}
