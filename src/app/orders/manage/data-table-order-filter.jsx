import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import * as React from 'react'
import { statuses } from './data/data'

export function DataTableToolbarFilter({ table }) {
  const [value, setValue] = React.useState('All')
  const column = table.getColumn('status')

  const handleValueChange = (value) => {
    setValue(value)
    const newValue = value === 'All' ? undefined : value
    column?.setFilterValue(newValue)
  }

  return (
    <RadioGroup
      className="flex w-full flex-wrap gap-8 rounded-md border p-4 md:w-full md:grid-cols-2"
      defaultValue="All"
      onValueChange={handleValueChange}
    >
      {statuses.map((status) => (
        <div
          key={status.value}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <RadioGroupItem value={status.value} id={status.value} />
          <Label htmlFor={status.value}>{status.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
