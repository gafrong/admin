'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getColumns, searchableColumnHeaders } from './columns'

export default function Page() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const userId = user?._id
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])

  const getVendorVideos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseURL}videos/user/${userId}/videos`)

      setVideos(response.data.videos)
      console.log('vidoe counts', videos)
    } catch (error) {
      console.log('Product fetch error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      getVendorVideos()
    }
  }, [userId])

  const removeVideo = (video) => {
    axios
      .delete(`${baseURL}videos/${video._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const updatedVideos = videos.filter((item) => item._id !== video._id)
        setVideos(updatedVideos)
      })
      .catch((error) => [
        console.log('Status', error.response.status),
        console.log('Data', error.response.data.message),
      ])
  }

  const columns = getColumns({ removeVideo })

  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>동영상 관리</PageTitle>

      <DataTable
        columns={columns}
        controls={{ dateRangePicker: 'dateCreated' }}
        data={videos}
        isLoading={loading}
        searchableColumnHeaders={searchableColumnHeaders}
      />
    </div>
  )
}
