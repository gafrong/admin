import { statuses } from '@/app/orders/manage/data/data'
import { LoadingSpinnerButton } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function SelectCategory({
  currentStatus,
  isLoading,
  updateOrderStatus,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {isLoading ?
            <LoadingSpinnerButton />
            : '...'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>아래 단계로 변경</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {statuses
            .filter((status) => status.value !== 'All')
            .map(({ label, value }) => {
              return (
                <DropdownMenuItem
                  disabled={currentStatus === value}
                  key={value}
                  onClick={() => updateOrderStatus(value)}
                >
                  <span>{label}</span>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
