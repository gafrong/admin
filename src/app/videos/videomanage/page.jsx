'use client'

import { DataTable } from '@/app/orders/manage/data-table'
import baseURL from '@/assets/common/baseUrl'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { getColumns } from './columns'
import styles from './videoadd.module.css'

const searchableColumnHeaders = [
  { id: 'dateCreated', label: '날짜', placeholder: '검색 날짜...' },
  { id: 'description', label: '설명', placeholder: '검색 설명...' },
]

export default function Page() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const userId = user?._id
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  })

  // console.log('DATE SHOW', date)
  const handleQuery = () => {
    console.log('DATE', date)
  }
  const handleReset = () => {
    setDate({
      from: new Date(2023, 0, 20),
      to: addDays(new Date(2023, 0, 20), 20),
    })
  }

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
      <h1 className="scroll-m-20 pb-8 text-2xl font-extrabold tracking-tight lg:text-2xl">
        동영상 관리
      </h1>

      <div className={styles.durationContainer}>
        <div className="mr-5 flex flex-row">
          <div className="mr-5 mt-2">동영상 기간설정</div>
          <div className={cn('grid gap-2')}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ?
                    date.to ?
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    : format(date.from, 'LLL dd, y')
                  : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button className="ml-5" onClick={handleQuery}>
            조회
          </Button>
          <Button variant="secondary" className="ml-2" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </div>
      {/* end of duration select */}

      {/* Spacer */}
      <div className="h-4"></div>

      <DataTable
        columns={columns}
        data={videos}
        searchableColumnHeaders={searchableColumnHeaders}
      />
    </div>
  )
}
