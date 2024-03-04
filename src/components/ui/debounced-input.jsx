import { Input } from '@/components/ui/input'
import React from 'react'

// A debounced input react component
export function DebouncedInput({ onChange, debounce = 500, ...props }) {
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
