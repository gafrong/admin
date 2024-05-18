'use client'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import React from 'react'

export function ToastDestructive({ title, message, actionMsg }) {
  const { toast } = useToast()

  React.useEffect(() => {
    toast({
      variant: 'destructive',
      title,
      description: message,
      action: actionMsg && (
        <ToastAction altText="Try again">{actionMsg}</ToastAction>
      ),
    })
  }, [toast, title, message, actionMsg]) // dependencies of the effect

  return null
}
