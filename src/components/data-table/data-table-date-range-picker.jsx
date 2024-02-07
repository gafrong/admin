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

// Filter function
// -----------------------------------------------------------------------------
export function filterDateBetween(rows, id, filterValues) {
  const [start, end] = filterValues
  const startDate = start && new Date(start).getTime()
  let endDate = end && new Date(end)

  // add 24 hours to the end date so that it is inclusive
  if (endDate) {
    endDate.setDate(endDate.getDate() + 1)
    endDate = endDate.getTime()
  }

  if (!(endDate || startDate)) {
    return false
  }

  const cellDate = new Date(rows.getValue('dateCreated')).getTime()

  if (endDate && startDate) {
    return cellDate >= startDate && cellDate <= endDate
  }

  if (startDate) {
    return cellDate >= startDate
  }

  if (endDate) {
    return cellDate <= endDate
  }

  return false
}

const initialDateRange = {
  from: addDays(new Date(), -365),
  to: new Date(),
}

export function DateRangePicker({ table, dateColumnId }) {
  const { setFilterValue } = table.getColumn(dateColumnId)

  const [date, setDate] = useState(initialDateRange)

  useEffect(() => {
    setFilterValue([initialDateRange.from, initialDateRange.to])
  }, [setFilterValue])

  const handleReset = () => {
    setDate(initialDateRange)
    setFilterValue(() => [initialDateRange.from, initialDateRange.to])
  }

  const handleSetDate = (datePickerDate) => {
    if (!datePickerDate) {
      console.log('!datePickerDate', datePickerDate)
      return null
    }
    console.log('DATE', datePickerDate, date)

    setDate(datePickerDate)
    setFilterValue(() => [datePickerDate?.from, datePickerDate?.to])
  }

  const handleQuery = () => {
    console.log('DATE', date)
  }

  const dateFrom = date?.from && format(date.from, 'LLL dd, y')
  const dateTo = date?.to && format(date.to, 'LLL dd, y')
  const ButtonText =
    dateFrom && dateTo ? `${dateFrom} - ${dateTo}`
    : dateFrom ? dateFrom
    : 'Pick a date'

  return (
    <div className="flex flex-wrap gap-4 rounded border p-2">
      <div className="mt-2">동영상 기간설정</div>
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
      <Button onClick={handleQuery}>조회</Button>
      <Button variant="secondary" onClick={handleReset}>
        초기화
      </Button>
    </div>
  )
}
