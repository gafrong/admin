'use client'

import { DataTableFilterByCategory } from '@/components/data-table/data-table-filter-by-category'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { DebouncedInput } from '../ui/debounced-input'
import { DateRangePicker } from './data-table-date-range-picker'

export const EmptyTableRows = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} className="h-24 text-center">
      No results.
    </TableCell>
  </TableRow>
)

export const LoadingTableRows = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} className="h-24 text-center">
      <LoadingSpinner className="h-40" />
    </TableCell>
  </TableRow>
)

const SearchBarRadioItems = ({
  searchableColumnHeaders,
  handleSearchChange,
}) => {
  return (
    <RadioGroup
      className="flex w-full flex-wrap gap-8 rounded-md p-4"
      defaultValue={searchableColumnHeaders?.[0]}
      onValueChange={handleSearchChange}
    >
      {searchableColumnHeaders?.map((header) => (
        <div
          key={header.id}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <RadioGroupItem value={header} id={header.id} />
          <Label htmlFor={header.id}>{header.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
const DateAndSearchBar = ({
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

export function DataTable({
  columns,
  className = '',
  controls = {},
  data = [],
  defaultCellStyle = '',
  isLoading,
  refetchTableData,
}) {
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false)
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowSelectionIds, setRowSelectionIds] = React.useState({})
  const [sorting, setSorting] = React.useState([])
  const [tableData, setTableData] = React.useState([...data])
  const handleRowClick = controls?.onRowClick || (() => null)

  React.useEffect(() => {
    data?.length && setTableData([...data])
  }, [data])

  const { searchableColumnHeaders, filterByCategory } = controls ?? {}
  const [searchColumn, setSearchColumn] = React.useState(
    (searchableColumnHeaders && searchableColumnHeaders[0]?.id) ?? null,
  )
  const useSelectedCategory = React.useState('All')
  const [selectedRowIds, setSelectedRowIds] = React.useState({})

  // const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: tableData,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    // onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      selectedRowIds,
      sorting,
    },
  })

  React.useEffect(() => {
    setRowSelectionIds(
      table.getSelectedRowModel().rows.map(({ original }) => original._id),
    )
  }, [rowSelection, table]) // update selected rows

  if (!tableData && !tableData?.length && table?.getRowModel()?.rows) {
    console.log('no table data')
    return <div>no table</div>
  }

  const handleSearchUpdate = (value) => {
    if (!searchColumn || !value) return
    table.getColumn(searchColumn)?.setFilterValue(String(value))
  }

  const findBy = ({ arr, key, value }) =>
    arr.find((item) => item[key] === value) || null

  const getSearchPlaceHolder = () => {
    const columnToSearch = findBy({
      arr: searchableColumnHeaders ?? [],
      key: 'id',
      value: searchColumn,
    })
    if (columnToSearch?.placeholder) return columnToSearch?.placeholder
    if (columnToSearch?.label) return 'Search ' + columnToSearch?.label + '...'
    return 'Search ' + searchColumn + '...'
  }

  const isDataLoaded = Boolean(
    tableData?.length && table?.getRowModel()?.rows?.length,
  )
  const isNoData = !isDataLoaded && !isLoading

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* {JSON.stringify({data:table.getFilteredSelectedRowModel().rows})} */}

      <DateAndSearchBar
        controls={controls}
        getSearchPlaceHolder={getSearchPlaceHolder}
        handleSearchUpdate={handleSearchUpdate}
        isSearchBarOpen={isSearchBarOpen}
        searchableColumnHeaders={searchableColumnHeaders}
        searchColumn={searchColumn}
        setSearchColumn={setSearchColumn}
        table={table}
      />

      {filterByCategory && (
        <DataTableFilterByCategory
          categories={filterByCategory.categories}
          categoryHeader={filterByCategory.categoryHeader}
          isSearchBarOpen={isSearchBarOpen}
          orderItemIds={rowSelectionIds}
          refetchTableData={refetchTableData}
          rowSelectionIds={rowSelectionIds}
          setIsSearchBarOpen={setIsSearchBarOpen}
          table={table}
          useSelectedCategory={useSelectedCategory}
        />
      )}

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
            {isDataLoaded &&
              !isLoading &&
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  className={controls?.onRowClick ? 'cursor-pointer' : ''}
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={defaultCellStyle}
                      onClick={
                        cell?.column?.id !== 'memo' ?
                          () => handleRowClick({ row })
                        : null
                      }
                    >
                      {cell?.column?.id === 'memo' &&
                        console.log({ celll: cell })}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {isNoData && <EmptyTableRows columns={columns} />}
            {isLoading && <LoadingTableRows columns={columns} />}
          </TableBody>
        </Table>
      </div>

      {!controls?.isPaginationHidden && (
        <DataTablePagination table={table} columns={columns} />
      )}
    </div>
  )
}
