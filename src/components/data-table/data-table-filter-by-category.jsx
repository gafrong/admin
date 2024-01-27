import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import * as React from 'react'

export function DataTableFilterByCategory({
  categories,
  categoryHeader,
  table,
}) {
  const [value, setValue] = React.useState('All')
  const column = table.getColumn(categoryHeader)

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
      {categories?.map((category) => (
        <div
          key={category.value}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <RadioGroupItem value={category.value} id={category.value} />
          <Label htmlFor={category.value}>{category.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
