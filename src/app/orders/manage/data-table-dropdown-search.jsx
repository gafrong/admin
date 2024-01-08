'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export function DataTableDropdownSearch({ searchColumn, setSearchColumn }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mr-4 hidden h-10 md:flex">
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
          Search
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-54">
        <DropdownMenuLabel>Change search</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          className="capitalize"
          checked={searchColumn === 'name'}
          onCheckedChange={() => setSearchColumn('name')}
        >
          User Name
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          className="capitalize"
          checked={searchColumn === 'orderNumber'}
          onCheckedChange={() => setSearchColumn('orderNumber')}
        >
          Order Number
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
