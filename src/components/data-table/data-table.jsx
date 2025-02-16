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
import { cn } from '@/lib/utils'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { DateAndSearchBar } from './data-table-date-and-search-bar'
import { DataTableToggleColumns } from './data-table-toggle-columns'

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
    if (!data?.length) return
    if (data.length === 1 && data[0] === undefined) {
      console.error('table items are undefined')
      return setTableData([])
    }
    setTableData([...data])
  }, [data])

  const { searchableColumnHeaders, filterByCategory } = controls ?? {}

  const isToggleColumnsActive =
    controls?.columnVisibilityToggles || controls?.columnBooleanFilterToggle

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
    // facet filter
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(),

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
  const isBooleanOrColumnsFilterActive =
    controls?.columnVisibilityToggles || controls?.columnBooleanFilterToggle
  const searchResetRef = React.useRef(null)

  return (
    <div className={cn('w-full space-y-4', className)}>
      <DateAndSearchBar
        controls={controls}
        getSearchPlaceHolder={getSearchPlaceHolder}
        handleSearchUpdate={handleSearchUpdate}
        isSearchBarOpen={isSearchBarOpen}
        onResetRef={searchResetRef}
        searchableColumnHeaders={searchableColumnHeaders}
        searchColumn={searchColumn}
        setSearchColumn={setSearchColumn}
        table={table}
      />

      {filterByCategory && (
        <DataTableFilterByCategory
          categories={filterByCategory.categories}
          categoryHeader={filterByCategory.categoryHeader}
          isIconHidden={filterByCategory.isIconHidden}
          isSearchBarOpen={isSearchBarOpen}
          orderItemIds={rowSelectionIds}
          refetchTableData={refetchTableData}
          rowSelectionIds={rowSelectionIds}
          searchResetRef={searchResetRef}
          setIsSearchBarOpen={setIsSearchBarOpen}
          table={table}
          useSelectedCategory={useSelectedCategory}
        />
      )}

      {isBooleanOrColumnsFilterActive && (
        <DataTableToggleColumns table={table} controls={controls} />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
                        header.column.columnDef.className,
                      )}
                    >
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
                      className={cn(
                        defaultCellStyle,
                        cell.column.columnDef.className,
                      )}
                      onClick={
                        cell?.column?.id !== 'memo' ?
                          () => handleRowClick({ row })
                        : null
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading && isNoData && <EmptyTableRows columns={columns} />}
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
