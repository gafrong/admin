'use client'

import { useSuperadminQuestions } from '@/app/messages/superadmin-questions/api'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { hasAdminLevel, hasSuperAdminRole } from '@/utils/user-utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
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
import { UnreadBadge } from '../UnreadBadge'
import { getQuestionCounts } from './utils'

export const Sidebar = () => {
  const { data: session } = useSession()
  const isSuperAdmin = hasSuperAdminRole(session?.user)
  const { data: questions } = useSuperadminQuestions(isSuperAdmin)

  if (!hasAdminLevel(session?.user)) {
    return null
  }

  const { needsReplyCount, readNeedsReplyCount } = getQuestionCounts(
    questions,
    isSuperAdmin,
  )

  return (
    <div className="fixed z-10 m-0 mt-20 h-full w-40 overflow-auto border-r border-slate-300 bg-white p-0">
      <Link
        className="block border-b border-b-slate-200 p-4 text-black hover:bg-slate-200"
        href="/dashboard"
      >
        <div className="flex flex-row">
          <FiHome className="mr-2 mt-1" /> <div>홈</div>
        </div>
      </Link>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-video"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiVideo className="mr-2 mt-1" /> <div>영상</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/videos/videoadd"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              등록
            </Link>
            <Link
              href="/videos/videomanage"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              관리
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-goods"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiGift className="mr-2 mt-1" /> <div>상품</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/products/productregister"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              등록
            </Link>
            <Link
              href="/products/productedit"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              편집
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-order"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiShoppingCart className="mr-2 mt-1" /> <div>주문</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/orders/manage"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              관리
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-customer"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiUsers className="mr-2 mt-1" /> <div>고객</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/clients/search"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              찾기
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-customer-enquiry"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiMessageCircle className="mr-2 mt-1" />{' '}
              <div className="mr-4">고객 문의</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/messages/productquery"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              문의
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-statistics"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiBarChart2 className="mr-2 mt-1" /> <div>통계</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/statistics/daily"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              Daily Sales
            </Link>
            <Link
              href="/statistics/weekly"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              Weekly Sales
            </Link>
            <Link
              href="/statistics/monthly"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              Monthly Sales
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-store-settings"
          className="block pl-5 pr-2 text-black"
        >
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiEdit className="mr-2 mt-1" /> <div>스토어 설정</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/settings/general"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              기본 정보
            </Link>
            <Link
              href="/settings/contacts"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              담당자 정보
            </Link>
            <Link
              href="/settings/delivery"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              배송 정보
            </Link>
            <Link
              href="/settings/business"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              사업자 정보
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {isSuperAdmin && (
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-super-user"
            className="block pl-5 pr-2 text-black"
          >
            <AccordionTrigger>
              <div className="flex flex-row">
                <FiSettings className="mr-2 mt-1" />
                <div>Superuser</div>
                <UnreadBadge
                  needsReplyCount={needsReplyCount}
                  unreadCount={readNeedsReplyCount}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link
                href="/superuser/vendors"
                className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
              >
                vendors
              </Link>
              <Link
                href="/superuser/users"
                className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
              >
                users
              </Link>
              <Link
                href="/messages/superadmin-questions"
                className="flex flex-row items-center pb-3 pl-3 pt-3 hover:bg-slate-200"
              >
                <span>superadmin questions</span>
                <UnreadBadge needsReplyCount={0} unreadCount={0} />
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {!isSuperAdmin && (
        <>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-superadmin-questions"
              className="block pl-5 pr-2 text-black"
            >
              <AccordionTrigger>
                <div className="flex flex-row">
                  <FiHelpCircle className="mr-2 mt-1" />
                  <div>1:1 문의</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="/messages/superadmin-questions/new"
                  className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
                >
                  New Query
                </Link>
                <Link
                  href="/messages/superadmin-questions"
                  className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
                >
                  List Queries
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  )
}
