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
import Image from 'next/image'
import { FiZoomIn } from 'react-icons/fi'

export function ImageZoomDialog({ documentImage, className = '' }) {
  return (
    <Dialog className={'flex items-center justify-center ' + className}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FiZoomIn className="mr-2" />
          Zoom image
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full  max-h-[calc(100%-4rem)] w-10/12 max-w-[calc(100%-4rem)] flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Business document</DialogTitle>
          <DialogDescription>Review your business document</DialogDescription>
        </DialogHeader>
        <div className="relative flex-grow">
          <Image
            alt={`document image`}
            className="object-cover object-center"
            fill
            priority={true}
            sizes=""
            src={documentImage}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
