'use client'


import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { DateRange } from 'react-day-picker'

import axios from 'axios'
import Link from 'next/link'
import styles from './videoadd.module.css'
import useUserStore from '@/store/zustand'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export default function Page() {
    const user = useUserStore((state) => state.user);
    const userId = user?._id;
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([]);
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
    

    return (
        <div className="pl-5 pt-5">
            <div>
                <h1 className="text-2xl">동영상 관리</h1>
            </div>
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
            {videos?.length > 0 &&
                videos.map((video, index) => (
                    <TableRow key={index}>
                    <TableCell>
                        <img
                            src={awsURL + video.image}
                            alt={`Product ${index}`}
                            className="h-18 w-12 rounded-sm"
                        />
                    </TableCell>
                    <TableCell>
                        <div className="mt-2 pl-5">{video.description}</div>
                    </TableCell>
                    <TableCell>
                        <Link
                        href={{
                            pathname: '/products/productdetail',
                            query: { video: JSON.stringify(video) },
                        }}
                        >
                        edit
                        </Link>
                    </TableCell>
                    </TableRow>
                ))}
        </div>
    )
}
