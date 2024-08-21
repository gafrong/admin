'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { DebouncedInput } from '../ui/debounced-input'
import { DateRangePicker } from './data-table-date-range-picker'

const SearchBarRadioItems = ({
  handleSearchChange,
  searchableColumnHeaders,
}) => {
  return (
    <RadioGroup
      className="flex w-full flex-wrap gap-8 rounded-md p-4"
      defaultValue={searchableColumnHeaders?.[0]}
      onValueChange={handleSearchChange}
    >
      {searchableColumnHeaders?.map((header) => (
        <div
          className="flex items-center space-x-2 whitespace-nowrap"
          key={header.id}
        >
          <RadioGroupItem value={header} id={header.id} />
          <Label htmlFor={header.id}>{header.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
export const DateAndSearchBar = ({
  controls,
  getSearchPlaceHolder,
  handleSearchUpdate,
  isSearchBarOpen,
  searchableColumnHeaders,
  setSearchColumn,
  table,
}) => {
  const isMultipleColumnSearch = searchableColumnHeaders?.length > 1
  let isRendered =
    isSearchBarOpen ||
    !controls?.filterByCategory ||
    controls?.isSearchAlwaysShown
  isRendered = controls?.isDateAndSearchBarHidden ? false : isRendered

  const resetRef = React.useRef(null)

  const handleSearchChange = (header) => {
    searchableColumnHeaders.forEach((column) => {
      table.getColumn(column.id)?.setFilterValue('')
    })
    setSearchColumn(header.id)
    resetRef.current()
  }

  return (
    <>
      {isRendered && (
        <div className="flex flex-col rounded border">
          {controls.dateRangePicker && (
            <DateRangePicker
              dateColumnId={controls.dateRangePicker}
              table={table}
            />
          )}

          <div className="py-2 pt-1">
            {isMultipleColumnSearch && (
              <SearchBarRadioItems
                searchableColumnHeaders={searchableColumnHeaders}
                handleSearchChange={handleSearchChange}
              />
            )}

            <div className="flex">
              <MagnifyingGlassIcon className="ml-4 mt-2 h-6 w-6" />
              <DebouncedInput
                className="h-10 border-none px-4"
                onChange={handleSearchUpdate}
                reset={resetRef}
                placeholder={getSearchPlaceHolder()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
