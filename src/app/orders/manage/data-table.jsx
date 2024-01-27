'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search } from 'lucide-react'
import * as React from 'react'
import { DebouncedInput } from '../../../components/ui/debounced-input'
import { DataTableDropdownSearch } from './data-table-dropdown-search'
import { DataTableFilterByCategory } from './data-table-filter-by-category'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from './data-table-view-options'

// fuzzy global filter. Disabled for now
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value);

//   // Store the itemRank info
//   addMeta({
//     itemRank,
//   });

//   // Return if the item should be filtered in/out
//   return itemRank.passed;
// };

export const EmptyTableRows = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} className="h-24 text-center">
      No results.
    </TableCell>
  </TableRow>
)

export function DataTable({
  columns,
  data,
  defaultCellStyle = '',
  filterByCategory,
  searchableColumnHeaders = undefined,
}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [searchColumn, setSearchColumn] = React.useState(
    searchableColumnHeaders[0]?.id ?? null,
  )
  // const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // onGlobalFilterChange: setGlobalFilter,
    // globalFilterFn: fuzzyFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleSearchDropdown = (value) => {
    searchableColumnHeaders.forEach((column) => {
      table.getColumn(column.id)?.setFilterValue('')
    })
    setSearchColumn(value)
  }

  const handleSearchUpdate = (value) => {
    table.getColumn(searchColumn)?.setFilterValue(value)
  }

  const findBy = ({ arr, key, value }) => {
    return arr.find((item) => item[key] === value) || null
  }

  const getSearchPlaceHolder = () => {
    return (
      findBy({
        arr: searchableColumnHeaders ?? [],
        key: 'id',
        value: searchColumn,
      })?.placeholder ?? 'Search ' + searchColumn + '...'
    )
  }

  const isMultipleColumnSearch = searchableColumnHeaders?.length > 1

  return (
    <div className="w-full space-y-4">
      {filterByCategory && (
        <DataTableFilterByCategory
          categories={filterByCategory.categories}
          categoryHeader={filterByCategory.categoryHeader}
          table={table}
        />
      )}

      <div className="p4 flex justify-between">
        {searchableColumnHeaders && (
          <>
            {isMultipleColumnSearch && (
              <DataTableDropdownSearch
                searchColumn={searchColumn}
                setSearchColumn={handleSearchDropdown}
                searchableColumnHeaders={searchableColumnHeaders}
              />
            )}

            <DebouncedInput
              className="h-10 w-[150px] px-4 lg:w-[250px]"
              onChange={handleSearchUpdate}
              placeholder={getSearchPlaceHolder()}
            />
          </>
        )}

        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ?
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={defaultCellStyle}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : <EmptyTableRows columns={columns} />}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} columns={columns} />
    </div>
  )
}
