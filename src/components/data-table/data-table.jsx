'use client'

import { DataTableFilterByCategory } from '@/components/data-table/data-table-filter-by-category'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

const DateAndSearchBar = ({
  isSearchBarOpen,
  controls,
  handleSearchUpdate,
  getSearchPlaceHolder,
  table,
}) => {
  const isRendered = isSearchBarOpen || !controls?.filterByCategory
  return (
    <>
      {isRendered && (
        <div className="flex flex-col rounded border">
          <div className="flex justify-between p-2 px-4">
            {controls.dateRangePicker && (
              <DateRangePicker
                table={table}
                dateColumnId={controls.dateRangePicker}
              />
            )}
          </div>

          <div className="flex border-t">
            <MagnifyingGlassIcon className="ml-4 mt-2 h-6 w-6" />
            <DebouncedInput
              className="h-10 border-none px-4"
              onChange={handleSearchUpdate}
              placeholder={getSearchPlaceHolder()}
            />
          </div>
        </div>
      )}
    </>
  )
}

export function DataTable({
  columns,
  controls = {},
  data,
  defaultCellStyle = '',
  isLoading,
  refetchTableData,
  updateTableData,
}) {
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false)
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowSelectionIds, setRowSelectionIds] = React.useState({})
  const [sorting, setSorting] = React.useState([])
  const [tableData, setTableData] = React.useState([...data])

  React.useEffect(() => {
    setTableData([...data])
  }, [data])

  const { searchableColumnHeaders, filterByCategory } = controls ?? {}
  const meta = updateTableData && updateTableData({ setTableData })
  const [searchColumn, setSearchColumn] = React.useState(
    (searchableColumnHeaders && searchableColumnHeaders[0]?.id) ?? null,
  )
  const useSelectedCategory = React.useState('All')
  const [selectedRowIds, setSelectedRowIds] = React.useState({})

  // const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: tableData,
    columns,
    ...(meta ? { meta } : {}),
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
    table.getColumn(searchColumn)?.setFilterValue(value)
  }

  const findBy = ({ arr, key, value }) =>
    arr.find((item) => item[key] === value) || null

  const getSearchPlaceHolder = () => {
    return (
      findBy({
        arr: searchableColumnHeaders ?? [],
        key: 'id',
        value: searchColumn,
      })?.label ?? 'Search ' + searchColumn + '...'
    )
  }

  const isDataLoaded = Boolean(
    tableData?.length && table?.getRowModel()?.rows?.length,
  )
  const isNoData = !isDataLoaded && !isLoading

  return (
    <div className="w-full space-y-4">
      {/* {JSON.stringify({data:table.getFilteredSelectedRowModel().rows})} */}

      <DateAndSearchBar
        isSearchBarOpen={isSearchBarOpen}
        controls={controls}
        handleSearchUpdate={handleSearchUpdate}
        getSearchPlaceHolder={getSearchPlaceHolder}
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
              ))}
            {isNoData && <EmptyTableRows columns={columns} />}
            {isLoading && <LoadingTableRows columns={columns} />}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} columns={columns} />
    </div>
  )
}
