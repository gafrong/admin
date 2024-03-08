import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import {
  FiBarChart2,
  FiGift,
  FiHome,
  FiLayout,
  FiMessageCircle,
  FiShoppingCart,
  FiUsers,
  FiVideo,
  FiEdit,
  FiHelpCircle,
} from 'react-icons/fi'

const Sidebar = () => {
  return (
    <>
      <Link
        className="block border-b border-b-slate-200 p-5 text-black hover:bg-slate-200"
        href="/dashboard"
      >
        <div className="flex flex-row">
          <FiHome className="mr-2 mt-1" /> <div>홈</div>
        </div>
      </Link>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="block pl-5 pr-2 text-black">
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
              삭제
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="block pl-5 pr-2 text-black">
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
        <AccordionItem value="item-1" className="block pl-5 pr-2 text-black">
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
        <AccordionItem value="item-1" className="block pl-5 pr-2 text-black">
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
        <AccordionItem value="item-1" className="block pl-5 pr-2 text-black">
          <AccordionTrigger>
            <div className="flex flex-row">
              <FiMessageCircle className="mr-2 mt-1" /> <div className='mr-4'>문의/리뷰</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="/messages/productquery"
              className="flex flex-col pb-3 pl-3 pt-3 hover:bg-slate-200"
            >
              고객 문의
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="block pl-5 pr-2 text-black">
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
      <div className='flex flex-row hover:bg-slate-200 border-b'>
        <FiEdit className="ml-5 mt-5" />
        <Link
          href="#"
          className="flex flex-col pl-3 pt-4 pb-4 hover:bg-slate-200"
        >
          기본 설정
        </Link>
      </div>
      <div className='flex flex-row hover:bg-slate-200 border-b'>
        <FiHelpCircle className="ml-5 mt-5" />
        <Link
          href="#"
          className="flex flex-col pl-3 pt-4 pb-4 hover:bg-slate-200"
        >
          1:1 문의
        </Link>
      </div>
    </>
  )
}

export default Sidebar
