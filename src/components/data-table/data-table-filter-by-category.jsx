import { statuses } from '@/app/orders/manage/data/data'
import baseURL from '@/assets/common/baseUrl'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useUserStore from '@/store/zustand'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import * as React from 'react'
import { FiXCircle } from 'react-icons/fi'
import { SelectCategory } from './data-table-dropdown-select-category'

const SearchBarButton = ({ isSearchBarOpen, setIsSearchBarOpen }) => (
  <Button
    className="ml-auto"
    onClick={(prev) => setIsSearchBarOpen(!isSearchBarOpen)}
    size="sm"
    variant="ghost"
  >
    {isSearchBarOpen ?
      <FiXCircle size={24} />
    : <MagnifyingGlassIcon className="h-8 w-8" />}
  </Button>
)

function UpdateOrderStatusButton({
  children,
  isLoading,
  updateOrderStatus,
  variant,
}) {
  return (
    <Button
      className="relative"
      disabled={isLoading}
      onClick={updateOrderStatus}
      variant={variant}
    >
      {children}
    </Button>
  )
}

function useUpdateStatus({ orderItemIds, refetchTableData, table }) {
  const token = useUserStore((state) => state?.token)
  const [isLoading, setIsLoading] = React.useState(false)

  const updateOrderStatus = async (newStatus) => {
    const URL = `${baseURL}orders/updateStatus`
    if (!token) {
      console.log('no vendor token!', { token })
      return
    }
    try {
      setIsLoading(true)
      await axios
        .patch(
          URL,
          {
            orderItemIds,
            newStatus,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          refetchTableData()
          // unselect all rows after we have updated the status on selected rows
          table.toggleAllRowsSelected(false)
        })
    } catch (error) {
      console.log('Error updating orderItem status:', { URL }, error)
    } finally {
      setIsLoading(false)
    }
  }
  return { updateOrderStatus, isLoading }
}

export function DataTableFilterByCategory({
  categories,
  categoryHeader,
  isSearchBarOpen,
  orderItemIds,
  refetchTableData,
  rowSelectionIds,
  setIsSearchBarOpen,
  table,
  useSelectedCategory,
}) {
  const [value, setValue] = useSelectedCategory
  const column = table.getColumn(categoryHeader)

  const { updateOrderStatus, isLoading } = useUpdateStatus({
    orderItemIds,
    refetchTableData,
    table,
  })

  const handleValueChange = (value) => {
    setValue(value)
    const newValue = value === 'All' ? undefined : value
    column?.setFilterValue(newValue)
  }

  function getAdjacentStatuses(currentStatus, statuses) {
    const currentIndex = statuses.findIndex(
      (status) => status.value === currentStatus,
    )

    const previousStatus =
      currentIndex > 0 ? statuses[currentIndex - 1].value : null

    const nextStatus =
      currentIndex < statuses.length - 1 ?
        statuses[currentIndex + 1].value
        : null

    return { previousStatus, nextStatus }
  }
  const { previousStatus, nextStatus } = getAdjacentStatuses(value, statuses)
  const isPreviousStatus = previousStatus && previousStatus !== 'All'
  const isRowSelected = rowSelectionIds.length > 0
  return (
    <div className="flex flex-col">
      <RadioGroup
        className="flex w-full flex-wrap gap-8 rounded-md border p-4 py-3"
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
        <SearchBarButton
          isSearchBarOpen={isSearchBarOpen}
          setIsSearchBarOpen={setIsSearchBarOpen}
        />
      </RadioGroup>

      <div className="flex gap-4">
        <div className="bold flex h-10 items-center">{value}</div>
        {isRowSelected && nextStatus && (
          <UpdateOrderStatusButton
            updateOrderStatus={() => updateOrderStatus(nextStatus)}
            isLoading={isLoading}
          >
            {nextStatus} 변경
          </UpdateOrderStatusButton>
        )}

        {isRowSelected && isPreviousStatus && (
          <UpdateOrderStatusButton
            isLoading={isLoading}
            updateOrderStatus={() => updateOrderStatus(previousStatus)}
            variant="outline"
          >
            {previousStatus} 변경
          </UpdateOrderStatusButton>
        )}

        {isRowSelected && (
          <SelectCategory
            isLoading={isLoading}
            currentStatus={value}
            updateOrderStatus={updateOrderStatus}
          />
        )}
      </div>
    </div>
  )
}
