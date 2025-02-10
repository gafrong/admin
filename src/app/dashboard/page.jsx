'use client'

import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri'

function SidebarButton() {
  const { state } = useSidebar()

  return (
    <SidebarTrigger className="top-20-off border-grey-900 z-50 -ml-40 rounded-none rounded-br-md border-b border-r bg-gray-50 p-2">
      {state === 'collapsed' ?
        <RiMenuUnfoldFill className="h-5 w-5" />
      : <RiMenuFoldFill className="h-5 w-5" />}
    </SidebarTrigger>
  )
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar className="mt-16" />
      <SidebarButton />
    </SidebarProvider>
  )
}
