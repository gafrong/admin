'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'

export const TableClientDetails = ({ client }) => (
  <div className="mb-10 overflow-hidden rounded-sm border">
    <Table>
      <TableBody>
        <TableRow>
          <TableHead className="w-40 bg-muted" scope="row">
            Name
          </TableHead>
          <TableCell className="w-4/12">{client?.name}</TableCell>

          <TableHead className="w-40 bg-muted" scope="row">
            Id
          </TableHead>
          <TableCell>{client?._id}</TableCell>
        </TableRow>

        <TableRow>
          <TableHead className="w-40 bg-muted" scope="row">
            Username
          </TableHead>
          <TableCell>{client?.username}</TableCell>

          <TableHead className="w-40 bg-muted" scope="row">
            Phone
          </TableHead>
          <TableCell>{client?.phone}</TableCell>
        </TableRow>

        <TableRow>
          <TableHead className="w-40 bg-muted" scope="row">
            Address
          </TableHead>
          <TableCell colspan="4">{client?.address}</TableCell>
        </TableRow>

        <TableRow>
          <TableHead className="w-40 bg-muted" scope="row">
            Email
          </TableHead>
          <TableCell colspan="4">{client?.email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)
