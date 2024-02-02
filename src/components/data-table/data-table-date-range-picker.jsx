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
import React, { useEffect, useState } from 'react'

const initialDateRange = {
  from: new Date(2023, 0, 20),
  to: addDays(new Date(2023, 0, 20), 20),
}

export function DateRangePicker({ table, dateColumnId }) {
  const columnDateCreated = table.getColumn(dateColumnId)
  const setFilterValue = columnDateCreated.setFilterValue

  const [date, setDate] = useState(initialDateRange)

  useEffect(() => {
    setFilterValue([initialDateRange.from, initialDateRange.to])
  }, [setFilterValue])

  const handleReset = () => {
    setDate(initialDateRange)
    setFilterValue(() => [initialDateRange.from, initialDateRange.to])
  }

  const handleSetDate = (date) => {
    if (!date) {
      return null
    }
    setDate(date)
    setFilterValue(() => [date?.from, date?.to])
  }

  const handleQuery = () => {
    console.log('DATE', date)
  }

  const ButtonText =
    date?.from && date.to ?
      `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}`
    : date?.from ? format(date.from, 'LLL dd, y')
    : 'Pick a date'

  return (
    <div className="mr-2 rounded border p-2">
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
                {ButtonText}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                defaultMonth={date?.from}
                initialFocus
                mode="range"
                numberOfMonths={2}
                onSelect={handleSetDate}
                selected={date}
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
  )
}
