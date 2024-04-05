'use client'

import { protectRoute } from '@/app/(auth)/_components/protect-route'
import { useFetchAuth } from '@/app/fetch/use-fetch-auth'
import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageContainer, PageTitle } from '@/components/typography/PageTitle'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import { getColumns, searchableColumnHeaders } from './columns'

function Page() {
  const { data: session, status } = useSession()
  const token = session?.token
  const userId = session?.user?._id

  const url = userId ? `videos/user/${userId}/videos` : null
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
    <PageContainer>
      <PageTitle>동영상 관리</PageTitle>
      <DataTable
        columns={columns}
        controls={{ dateRangePicker, searchableColumnHeaders }}
        data={data?.videos}
        isLoading={isLoading || status === 'loading'}
      />
    </PageContainer>
  )
}

export default protectRoute(Page, 'videomanage')
