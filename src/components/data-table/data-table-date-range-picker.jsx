import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { addDays, format, formatRelative } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

// Utility function
export const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy.MM.dd')
}

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

const today = new Date()

const initialDateRange = {
  from: addDays(today, -365),
  to: today,
}

const DropdownPastDateRanges = ({ setDateRange }) => (
  <Select
    onValueChange={(value) => {
      const from = addDays(today, -parseInt(value))
      setDateRange({ from, to: today })
    }}
  >
    <div className="flex w-full">
      <SelectTrigger className="m-4 flex-auto">
        <SelectValue placeholder="선택하다" />
      </SelectTrigger>
    </div>
    <SelectContent position="popper">
      <SelectItem value="0">오늘</SelectItem>
      <SelectItem value="7">지난 주</SelectItem>
      <SelectItem value="31">지난달</SelectItem>
      <SelectItem value="93">지난 3개월</SelectItem>
      <SelectItem value="365">지난 해</SelectItem>
      <SelectItem value="730">지난 2년</SelectItem>
    </SelectContent>
  </Select>
)

const ButtonCalendarTrigger = ({ date }) => {
  const KOREAN_DATE_FORMAT = 'y년 dd일 MMM'
  const dateFrom =
    date?.from && format(date.from, KOREAN_DATE_FORMAT, { locale: ko })
  const dateTo = date?.to && format(date.to, KOREAN_DATE_FORMAT, { locale: ko })
  const ButtonText =
    dateFrom && dateTo ? `${dateFrom} - ${dateTo}`
      : dateFrom ? dateFrom
        : 'Pick a date'

  return (
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
  )
}

export function DateRangePicker({ table, dateColumnId }) {
  const { setFilterValue } = table.getColumn(dateColumnId)
  const [date, setDate] = useState(initialDateRange)

  const setDateRange = ({ from, to }) => {
    // set what the calendar shows
    setDate({ from, to })
    // filter the dates on the calendar in table
    setFilterValue(() => [from, to])
  }

  useEffect(() => {
    setFilterValue([initialDateRange.from, initialDateRange.to])
  }, [setFilterValue])

  const handleReset = () => {
    setDateRange(initialDateRange)
  }

  const handleSetDate = (datePickerDate) => {
    if (!datePickerDate) {
      return null
    }
    setDateRange(datePickerDate)
  }

  const handleQuery = () => {
    console.log('DATE', date)
  }

  return (
    <div className="flex flex-wrap gap-4 rounded border p-2">
      <div className="mt-2">동영상 기간설정</div>
      <div className={cn('grid gap-2')}>
        <Popover>
          <ButtonCalendarTrigger date={date} />
          <PopoverContent className="w-auto p-0" align="start">

            <DropdownPastDateRanges setDateRange={setDateRange} />
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
