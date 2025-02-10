'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRight } from 'lucide-react'

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? <FolderItem item={item} /> : <SingleItem item={item} />,
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const SingleItem = ({ item }) => (
  <SidebarMenuItem key={item.title}>
    <SidebarMenuButton asChild tooltip={item.title}>
      <a href={item.url}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
)

const FolderItem = ({ item }) => {
  const containsUnread =
    item.items?.some((subItem) => subItem.badge > 0) || false
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {containsUnread && (
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
                !
              </div>
            )}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a
                    href={subItem.url}
                    className="flex w-full items-center justify-between"
                  >
                    <span>{subItem.title}</span>
                    {subItem.badge > 0 && (
                      <SidebarMenuBadge>{subItem.badge}</SidebarMenuBadge>
                    )}
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
