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

const Today = () => {
  return (
    <>
      <div>Today Snapshot</div>
      <div className="pr-5 pt-5">
        <Table className="mr-10 border border-slate-200 pr-10">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="w-[100px]">입금전</TableHead>
              <TableHead className="w-[100px] border border-r-slate-200">
                상품준비중
              </TableHead>
              <TableHead className="w-[100px] border border-r-slate-200">
                배송준비중
              </TableHead>
              <TableHead className="w-[100px] border border-r-slate-200">
                배송중
              </TableHead>
              <TableHead className="w-[100px] border border-r-slate-200">
                취소
              </TableHead>
              <TableHead className="w-[100px] border border-r-slate-200">
                교환
              </TableHead>
              <TableHead className="w-[100px] border border-r-slate-200">
                반품
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
              <TableCell className="border border-r-slate-200 font-medium">
                12
              </TableCell>
              <TableCell className="border border-r-slate-200 font-medium">
                5
              </TableCell>
              <TableCell className="border border-r-slate-200 font-medium">
                5
              </TableCell>
              <TableCell className="font-medium">5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default Today
