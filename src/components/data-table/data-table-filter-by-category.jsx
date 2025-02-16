import { statuses } from '@/app/orders/manage/data/data'
import baseURL from '@/assets/common/baseUrl'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useSession } from 'next-auth/react'
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
  const { data: session } = useSession()
  const token = session?.token
  const [isLoading, setIsLoading] = React.useState(false)

  const updateOrderStatus = async (newStatus) => {
    const URL = `${baseURL}orders/updateStatus`
    if (!token) {
      console.error('no vendor token!', { token })
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
      console.error('Error updating orderItem status:', { URL }, error)
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
  isIconHidden,
  orderItemIds,
  refetchTableData,
  rowSelectionIds,
  setIsSearchBarOpen,
  table,
  useSelectedCategory,
  searchResetRef,
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
    column?.setFilterValue(String(newValue))

    // Reset search when filter is set to "All"
    if (value === 'All' && searchResetRef?.current) {
      searchResetRef.current()
    }
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
    <>
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
        {!isIconHidden && (
          <SearchBarButton
            isSearchBarOpen={isSearchBarOpen}
            setIsSearchBarOpen={setIsSearchBarOpen}
          />
        )}
      </RadioGroup>

      <div className="flex gap-4">
        {value && (
          <Badge variant="outline">
            <div className="bold">{value}</div>
          </Badge>
        )}
        {isRowSelected && nextStatus && (
          <UpdateOrderStatusButton
            updateOrderStatus={() => updateOrderStatus(nextStatus)}
            isLoading={isLoading}
          >
            {/* {nextStatus} 변경 */} 다음 단계로 변경
          </UpdateOrderStatusButton>
        )}

        {isRowSelected && isPreviousStatus && (
          <UpdateOrderStatusButton
            isLoading={isLoading}
            updateOrderStatus={() => updateOrderStatus(previousStatus)}
            variant="outline"
          >
            {/* {previousStatus} 변경 */} 이전 단계로 변경
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
    </>
  )
}
