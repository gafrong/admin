'use client'

import { useSuperadminQuestions } from '@/app/messages/superadmin-questions/api'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { getQuestionCounts } from '@/components/sidebar/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { hasAdminLevel, hasSuperAdminRole } from '@/utils/user-utils'
import { Frame, Map, PieChart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import {
  FiBarChart2,
  FiEdit,
  FiGift,
  FiHelpCircle,
  FiHome,
  FiMessageCircle,
  FiSettings,
  FiShoppingCart,
  FiUsers,
  FiVideo,
} from 'react-icons/fi'
import { RiMenuFoldFill } from 'react-icons/ri'

const data = {
  navMain: [
    {
      title: '홈',
      url: '/dashboard',
      icon: FiHome,
      isActive: true,
      items: null,
    },
    {
      title: '영상',
      url: '#',
      icon: FiVideo,
      items: [
        {
          title: '등록',
          url: '/videos/videoadd',
        },
        {
          title: '관리',
          url: '/videos/videomanage',
        },
      ],
    },
    {
      title: '상품',
      url: '#',
      icon: FiGift,
      items: [
        {
          title: '등록',
          url: '/products/productregister',
        },
        {
          title: '편집',
          url: '/products/productedit',
        },
      ],
    },
    {
      title: '주문',
      url: '#',
      icon: FiShoppingCart,
      items: [
        {
          title: '관리',
          url: '/orders/manage',
        },
      ],
    },
    {
      title: '고객',
      url: '#',
      icon: FiUsers,
      items: [
        {
          title: '찾기',
          url: '/clients/search',
        },
      ],
    },
    {
      title: '고객 문의',
      url: '#',
      icon: FiMessageCircle,
      items: [
        {
          title: '문의',
          url: '/messages/productquery',
        },
      ],
    },
    {
      title: '통계',
      url: '#',
      icon: FiBarChart2,
      items: [
        {
          title: 'Daily Sales',
          url: '/statistics/daily',
        },
        {
          title: 'Weekly Sales',
          url: '/statistics/weekly',
        },
        {
          title: 'Monthly Sales',
          url: '/statistics/monthly',
        },
      ],
    },
    {
      title: '스토어 설정',
      url: '#',
      icon: FiEdit,
      items: [
        {
          title: '기본 정보',
          url: '/settings/general',
        },
        {
          title: '담당자 정보',
          url: '/settings/contacts',
        },
        {
          title: '배송 정보',
          url: '/settings/delivery',
        },
        {
          title: '사업자 정보',
          url: '/settings/business',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const { data: session } = useSession()
  const isSuperAdmin = hasSuperAdminRole(session?.user)
  const { data: questions } = useSuperadminQuestions(isSuperAdmin)

  if (!hasAdminLevel(session?.user)) {
    return null
  }

  const { needsReplyCount, readNeedsReplyCount } =
    questions ?
      getQuestionCounts(questions, isSuperAdmin)
    : { needsReplyCount: 0, readNeedsReplyCount: 0 }

  const navItems = [...data.navMain]

  if (isSuperAdmin) {
    navItems.push({
      title: 'Superuser',
      url: '#',
      icon: FiSettings,
      items: [
        {
          title: 'vendors',
          url: '/superuser/vendors',
        },
        {
          title: 'users',
          url: '/superuser/users',
        },
        {
          title: 'superadmin questions',
          url: '/messages/superadmin-questions',
          badge: needsReplyCount + readNeedsReplyCount,
        },
      ],
    })
  } else {
    navItems.push({
      title: '1:1 문의',
      url: '#',
      icon: FiHelpCircle,
      items: [
        {
          title: 'New Query',
          url: '/messages/superadmin-questions/new',
        },
        {
          title: 'List Queries',
          url: '/messages/superadmin-questions',
        },
      ],
    })
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="mb-2 w-full justify-end md:hidden">
          <RiMenuFoldFill className="h-5 w-5" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
