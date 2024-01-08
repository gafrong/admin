import Link from "next/link";
import { FiHome, FiVideo, FiGift, FiShoppingCart, FiUsers, FiMessageCircle, FiBarChart2, FiLayout } from "react-icons/fi";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
  
const Sidebar = () => {
    return (
        <>
            <Link
                className="block text-black p-5 hover:bg-slate-200 border-b-slate-200 border-b"
                href="/dashboard"
            >
                <div className="flex flex-row">
                    <FiHome className="mr-2 mt-1"/> <div>Dashboard</div>
                </div> 
            </Link>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="block text-black pl-5 pr-2">
                    <AccordionTrigger >
                        <div className="flex flex-row">
                            <FiVideo className="mr-2 mt-1"/> <div>Videos</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Link href="/videos/videoadd" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Upload
                        </Link>
                        <Link href="/videos/videomanage" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Edit
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="block text-black pl-5 pr-2">
                    <AccordionTrigger >
                        <div className="flex flex-row">
                            <FiGift className="mr-2 mt-1"/> <div>Products</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Link href="/products/productregister" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Upload
                        </Link>
                        <Link href="/products/productedit" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Search/Edit
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="block text-black pl-5 pr-2">
                    <AccordionTrigger >
                        <div className="flex flex-row">
                            <FiShoppingCart className="mr-2 mt-1"/> <div>Orders</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Link href="/orders/manage" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Manage
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="block text-black pl-5 pr-2">
                    <AccordionTrigger >
                        <div className="flex flex-row">
                            <FiUsers className="mr-2 mt-1"/> <div>Clients</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Link href="/clients/search" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Search
                        </Link>
                        <Link href="/clients/ranking" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Customer Ranks
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="block text-black pl-5 pr-2">
                    <AccordionTrigger >
                        <div className="flex flex-row">
                            <FiMessageCircle className="mr-2 mt-1"/> <div>Message</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Link href="/messages/productquery" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Inquiry
                        </Link>
                        <Link href="/messages/review" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Review
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="block text-black pl-5 pr-2">
                    <AccordionTrigger >
                        <div className="flex flex-row">
                            <FiBarChart2 className="mr-2 mt-1"/> <div>Statistics</div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Link href="/statistics/daily" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Daily Sales
                        </Link>
                        <Link href="/statistics/weekly" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Weekly Sales
                        </Link>
                        <Link href="/statistics/monthly" className="flex flex-col pl-3 pt-3 pb-3 hover:bg-slate-200">
                            Monthly Sales
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default Sidebar