import { LoadingSpinnerButton } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export const DialogMemo = ({ submitVendorNote, initialValue, isLoading }) => {
  const [memo, setMemo] = useState(initialValue)
  const handleChange = (e) => {
    setMemo(e.target.value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={initialValue ? 'text-blue-500' : ''}
        >
          {initialValue ? 'Info' : 'None'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Memo</DialogTitle>
          <DialogDescription>
            Make changes to your memo here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="name" className="">
            Memo
          </Label>
          <Textarea
            id="name"
            value={memo}
            className="h-64"
            onChange={handleChange}
          />
        </div>

        <DialogFooter>
          <Button
            className="relative"
            variant={isLoading ? 'outline' : 'default'}
            onClick={(event) => {
              console.log('submitVendorNote', { event })
              event.stopPropagation()
              submitVendorNote({ vendorNote: memo })
            }}
          >
            Save
            {isLoading ?
              <LoadingSpinnerButton />
            : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
