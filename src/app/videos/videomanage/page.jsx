'use client'

import { useFetchAuth } from '@/app/orders/manage/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React from 'react'
import { getColumns, searchableColumnHeaders } from './columns'

export default function Page() {
  const token = useUserStore((state) => state?.token)
  const userId = useUserStore((state) => state.user)?._id
  const url = `videos/user/${userId}/videos`
  const { data, isLoading, mutate } = useFetchAuth(url)

  const removeVideo = (video) => {
    axios
      .delete(`${baseURL}videos/${video._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        mutate()
      })
      .catch((error) => [
        console.log('Status', error.response.status),
        console.log('Data', error.response.data.message),
      ])
  }

  const columns = getColumns({ removeVideo })
  const dateRangePicker = 'dateCreated'

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>동영상 관리</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker, searchableColumnHeaders }}
        data={data?.videos}
        isLoading={isLoading}
      />
    </div>
  )
}
