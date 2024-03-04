'use client'

import { DataTableDropdownSearch } from '@/components/data-table/data-table-dropdown-search'
import { DataTableFilterByCategory } from '@/components/data-table/data-table-filter-by-category'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
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
import * as React from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { DebouncedInput } from '../ui/debounced-input'
import { DateRangePicker } from './data-table-date-range-picker'

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

export const LoadingTableRows = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} className="h-24 text-center">
      <LoadingSpinner className="h-40" />
    </TableCell>
  </TableRow>
)

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

  if (
    !tableData &&
    !tableData?.length &&
    !tableData?.[0] &&
    table?.getRowModel()?.rows
  ) {
    console.log('no table data')
    return <div>no table</div>
  }

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
  const isDataLoaded = Boolean(
    tableData?.length && table?.getRowModel()?.rows?.length,
  )
  const isNoData = !isDataLoaded && !isLoading

  return (
    <div className="w-full space-y-4">
      {/* {JSON.stringify({data:table.getFilteredSelectedRowModel().rows})} */}
      {controls.dateRangePicker && (
        <DateRangePicker
          table={table}
          dateColumnId={controls.dateRangePicker}
        />
      )}
      {filterByCategory && (
        <DataTableFilterByCategory
          categories={filterByCategory.categories}
          categoryHeader={filterByCategory.categoryHeader}
          orderItemIds={rowSelectionIds}
          refetchTableData={refetchTableData}
          rowSelectionIds={rowSelectionIds}
          table={table}
          useSelectedCategory={useSelectedCategory}
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
