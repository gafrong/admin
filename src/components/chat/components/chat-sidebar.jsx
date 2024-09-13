'use client'

import { useVendorSupportQueries } from '@/app/messages/vendor-support-query/api'
import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getInitials } from '@/lib/utils'
import { Plus as PlusIcon, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { formatChatMessageTime } from '../utils/chat-utils'

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-4">
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search chats"
        className="h-9 pl-9 text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

const NewChatButton = () => {
  return (
    <Link href="/messages/vendor-support-query/new">
      <Button variant="ghost" size="icon" className="rounded-full">
        <PlusIcon className="h-5 w-5" />
        <span className="sr-only">New chat</span>
      </Button>
    </Link>
  )
}

const Empty = () => {
  return <p className="text-sm text-muted-foreground">No queries available.</p>
}

export function ChatSidebar({ user }) {
  const isSuperAdmin = user?.role === 'superAdmin'

  const { data: queries, isLoading } = useVendorSupportQueries(isSuperAdmin)

  const [searchQuery, setSearchQuery] = useState('')

  const filteredQueries = useMemo(() => {
    if (!queries) return []
    return queries.filter(
      (query) =>
        query.messages[0]?.content
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        query.participants[0]?.user?.name
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase()),
    )
  }, [queries, searchQuery])

  if (isLoading) {
    return <div className="w-[300px] border-r p-4">Loading...</div>
  }

  return (
    <div className="flex w-96 flex-col border-r bg-muted/20 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-medium">Chats</div>
        <NewChatButton />
      </div>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredQueries && filteredQueries.length > 0 ?
            filteredQueries.map((query) => (
              <ChatItem
                key={query._id}
                id={query._id}
                name={query.participants[0]?.user?.name || 'Unknown User'}
                image={query.participants[0]?.user?.image}
                message={query.messages?.[0]?.content || 'No messages'}
                time={formatChatMessageTime(
                  query.lastMessageAt || query.createdAt,
                )}
                queryType={query.queryType}
              />
            ))
          : <Empty />}
        </div>
      </ScrollArea>
    </div>
  )
}

const ProfileImageSideBar = ({ image, name }) => {
  const initials = getInitials(name || '?')
  return (
    <Avatar className="h-10 w-10 border">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

function ChatItem({ id, name, image, message, time, queryType }) {
  const imgSrc = image ? `${awsURL}${image}` : IMG.defaultProfile

  return (
    <Link
      href={`/messages/vendor-support-query/${id}`}
      className="flex w-full items-start gap-3 rounded-md p-2 hover:bg-muted/50"
      prefetch={false}
    >
      <ProfileImageSideBar image={imgSrc} name={name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="mr-2 truncate font-medium">{name}</span>
          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {time}
          </span>
        </div>
        <div className="line-clamp-2 text-sm text-muted-foreground">
          {message}
        </div>
      </div>
    </Link>
  )
}
