import { CardTitleDescription } from '@/app/settings/_components/card-title-description'
import awsURL from '@/assets/common/awsUrl'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ifDate } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { DEBUG_DeleteDocumentHistory } from './debug'

function DocumentHistoryImage({ s3Key }) {
  return (
    <div className="relative h-36 w-36">
      <Image
        alt="document image"
        className="object-cover object-center"
        fill
        sizes="144px"
        priority={true}
        src={`${awsURL}${s3Key}`}
      />
    </div>
  )
}

export function DocumentHistoryTable({ documentHistory }) {
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            {/* <TableHead>Document path</TableHead> */}
            <TableHead>Uploaded Date</TableHead>
            <TableHead>Approved Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentHistory.map((history, index) => (
            <TableRow key={index}>
              <TableCell>
                <DocumentHistoryImage s3Key={history.s3Key} />
              </TableCell>
              {/* <TableCell>{history.s3Key}</TableCell> */}
              <TableCell>{ifDate(history.uploadedAt)}</TableCell>
              <TableCell>{ifDate(history.approvedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export const DocumentHistory = ({ documentHistory = [] }) => {
  if (documentHistory.length === 0) {
    return null
  }

  return (
    <Card className="relative mx-auto mt-10 max-w-screen-xl p-6 pt-0">
      <div className="">
        <CardTitleDescription
          title="Document History"
          description="History of changes made to the documents"
        />
        <div className="p-6">
          <DocumentHistoryTable documentHistory={documentHistory} />
          <DEBUG_DeleteDocumentHistory className="mb-6 mt-12" />
        </div>
      </div>
    </Card>
  )
}
