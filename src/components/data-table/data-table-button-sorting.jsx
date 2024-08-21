import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

// Table components
// -----------------------------------------------------------------------------

// General sorting button, add to any column to make it sortable
export const ButtonSortable = ({ column, children, className }) => {
  const direction = column.getIsSorted()
  const isUp = direction === 'asc'
  const isDown = direction === 'desc'
  const isDefault = !isUp && !isDown
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(isUp)}
      className={cn('px-0', className)}
    >
      {children}
      {isUp && <ArrowUp className="ml-2 h-4 w-4" />}
      {isDown && <ArrowDown className="ml-2 h-4 w-4" />}
      {isDefault && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  )
}
