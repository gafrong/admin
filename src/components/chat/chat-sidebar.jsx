// import { PlusIcon, SearchIcon } from '@/components/Icons'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import Link from 'next/link'

// export function ChatSidebar() {
//   return (
//     <div className="flex w-[300px] flex-col border-r bg-muted/20 p-4">
//       <div className="mb-4 flex items-center justify-between">
//         <div className="text-lg font-medium">Chats</div>
//         <Button variant="ghost" size="icon" className="rounded-full">
//           <PlusIcon className="h-5 w-5" />
//           <span className="sr-only">New chat</span>
//         </Button>
//       </div>
//       <div className="relative mb-4">
//         <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//         <Input
//           type="search"
//           placeholder="Search chats"
//           className="h-9 pl-9 text-sm"
//         />
//       </div>
//       <ScrollArea className="flex-1">
//         <div className="space-y-2">
//           <ChatItem
//             name="John Doe"
//             message="Hey, how's it going?"
//             time="2:30 PM"
//           />
//           <ChatItem
//             name="Jane Smith"
//             message="Did you see the new update?"
//             time="12:45 PM"
//           />
//           <ChatItem
//             name="Alex Johnson"
//             message="Sounds good, let's do it!"
//             time="9:00 AM"
//           />
//           <ChatItem
//             name="Sarah Lee"
//             message="I'll be there in 10 minutes."
//             time="Yesterday"
//           />
//         </div>
//       </ScrollArea>
//     </div>
//   )
// }

// function ChatItem({ name, message, time }) {
//   return (
//     <Link
//       href="#"
//       className="flex items-center gap-3 rounded-md p-2 hover:bg-muted/50"
//       prefetch={false}
//     >
//       <Avatar className="h-10 w-10 border">
//         <AvatarImage src="/placeholder-user.jpg" alt="Image" />
//         <AvatarFallback>
//           {name
//             .split(' ')
//             .map((n) => n[0])
//             .join('')}
//         </AvatarFallback>
//       </Avatar>
//       <div className="flex-1 truncate">
//         <div className="truncate font-medium">{name}</div>
//         <div className="truncate text-sm text-muted-foreground">{message}</div>
//       </div>
//       <div className="text-xs text-muted-foreground">{time}</div>
//     </Link>
//   )
// }
'use client'

import { PlusIcon, SearchIcon } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { useVendorSupportQueries } from '@/lib/api'
import { useSession } from 'next-auth/react'
import { useState, useMemo } from 'react'
// import { getInitials } from '@/utils/helpers'
import { IMG } from '@/assets/common/urls'
import awsURL from '@/assets/common/awsUrl'

export function ChatSidebar() {
  const { data: session } = useSession()
  const isSuperAdmin = session?.user?.role === 'superAdmin'

  const {
    data: queries,
    isLoading,
  } = useVendorSupportQueries(isSuperAdmin)

  const [searchQuery, setSearchQuery] = useState('')

  const filteredQueries = useMemo(() => {
    if (!queries) return []
    return queries.filter((query) =>
      query.messages[0].content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.participants[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [queries, searchQuery])

  if (isLoading) {
    return <div className="w-[300px] border-r p-4">Loading...</div>
  }

  return (
    <div className="flex w-[300px] flex-col border-r bg-muted/20 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-medium">Chats</div>
        <Link href="/messages/vendor-support-query/new">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">New chat</span>
          </Button>
        </Link>
      </div>
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
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredQueries && filteredQueries.length > 0 ? (
            filteredQueries.map((query) => (
              <ChatItem
                key={query._id}
                id={query._id}
                name={query.participants[0]?.name || 'Unknown User'}
                image={query.participants[0]?.image}
                message={query.messages && query.messages.length > 0
                  ? query.messages[0].content
                  : 'No messages'}
                time={new Date(query.lastMessageAt || query.createdAt).toLocaleString()}
                queryType={query.queryType}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No queries available.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function ChatItem({ id, name, image, message, time, queryType }) {
  const imgSrc = image ? awsURL + image : IMG.profile
  const initials = ''//getInitials(name)

  return (
    <Link
      href={`/messages/vendor-support-query/${id}`}
      className="flex items-center gap-3 rounded-md p-2 hover:bg-muted/50"
      prefetch={false}
    >
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={imgSrc} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 truncate">
        <div className="flex items-center justify-between">
          <span className="truncate font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="truncate text-sm text-muted-foreground">{message}</div>
        {/* <div className="text-xs text-muted-foreground">{queryType}</div> */}
      </div>
    </Link>
  )
}
