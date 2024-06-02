import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import { CardTitleDescription } from '../../_components/card-title-description'

export function DocumentHistoryTable({ documentHistory }) {
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Document path</TableHead>
            <TableHead>Upload Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentHistory.map((history, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="relative h-[144px] w-[144px]">
                  <Image
                    alt="document image"
                    className="object-cover object-center"
                    fill
                    sizes="144px"
                    priority={true}
                    src={`${awsURL}${history.document}`}
                  />
                </div>
              </TableCell>
              <TableCell>{history.document}</TableCell>
              <TableCell>
                {format(new Date(history.updatedAt), 'dd/MM/yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export const DocumentHistory = ({ userId, token }) => {
  const [documentHistory, setDocumentHistory] = React.useState([])
  const URL_ENDPOINT = `${baseURL}vendor/document-history/${userId}`
  const headers = { Authorization: `Bearer ${token}` }

  React.useEffect(() => {
    const fetchDocumentHistory = async () => {
      try {
        const res = await axios.get(URL_ENDPOINT, { headers })
        setDocumentHistory(res.data.documentHistory)
      } catch (err) {
        console.error(err)
      }
    }

    userId && fetchDocumentHistory()
  }, [userId, token])

  if (!userId) {
    console.log('userId is undefined')
    return
  }
  console.log('userId is defined')

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
          <DocumentHistoryTable
            documentHistory={documentHistory}
            token={token}
          />
        </div>
      </div>
    </Card>
  )
}
