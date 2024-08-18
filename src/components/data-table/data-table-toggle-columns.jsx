// import { CheckboxToggleColumnFilter } from './data-table-checkbox-toggle-column-filter'

import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function ToggleColumnsCheckboxFilter({ column, options }) {
  const [isActive, setIsActive] = useState(false)

  const handleCheckboxChange = () => {
    const currentFilterValue = column.getFilterValue()
    const newValue = currentFilterValue ? undefined : true
    column.setFilterValue(newValue)
    setIsActive(Boolean(newValue))
  }

  const checkboxId = options.id + '-checkbox'

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={checkboxId}
        checked={isActive}
        onCheckedChange={handleCheckboxChange}
      />
      <label
        htmlFor={checkboxId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {options.label}
      </label>
    </div>
  )
}

function ToggleVisibleColumns({ table }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTableToggleColumns({ table, controls }) {
  // at least one of these 2 filters are configured

  return (
    <div className="flex gap-6 rounded-md border p-4">
      {/* Render column boolean filter toggles if they exist */}
      {controls?.columnBooleanFilterToggle &&
        controls.columnBooleanFilterToggle.map((option) => (
          <ToggleColumnsCheckboxFilter
            column={table.getColumn(option.id)}
            key={option.id}
            options={option}
          />
        ))}

      {/* Render column visibility toggles if they exist */}
      {controls?.columnVisibilityToggles && (
        <ToggleVisibleColumns table={table} />
      )}
    </div>
  )
}
