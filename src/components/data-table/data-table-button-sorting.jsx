import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'

// Table components
// -----------------------------------------------------------------------------

// General sorting button, add to any column to make it sortable
export const ButtonSortable = ({ column, children, className }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={cn('px-0', className)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}
