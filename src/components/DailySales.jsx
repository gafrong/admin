import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'

const DailySales = () => {
  return (
    <div className="mt-10">
      <div>Daily Sales</div>
      <div className="pr-5 pt-5">
        <Table className="mr-10 border border-slate-200 pr-10">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="w-[200px]">입금전</TableHead>
              <TableHead className="w-[200px] border border-r-slate-200">
                상품준비중
              </TableHead>
              <TableHead className="w-[200px] border border-r-slate-200">
                배송준비중
              </TableHead>
              <TableHead className="w-[200px] border border-r-slate-200">
                배송중
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border border-r-slate-200 font-medium">
                0
              </TableCell>
              <TableCell className="border border-r-slate-200 font-medium">
                10
              </TableCell>
              <TableCell className="border border-r-slate-200 font-medium">
                25
              </TableCell>
              <TableCell className="font-medium">5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DailySales
