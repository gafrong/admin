import { promises as fs } from 'fs'
import path from 'path'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import { statuses } from './data/data'

// Simulate a database read for products.
// Replace with a fetch call from mongodb in prod.
async function getData() {
  const data = await fs.readFile(
    // 70, 100 or 1,000 or 10,000 products:
    path.join(process.cwd(), 'src/mocks/data-100.json'),
    // path.join(process.cwd(), "src/mocks/data-100.json")
  )

  const parsedData = JSON.parse(data.toString())
  return parsedData
}

const searchableColumnHeaders = [
  { id: 'name', label: 'Name' },
  { id: 'orderNumber', label: 'Order Number' },
]

export default async function ManageOrdersPage() {
  const data = await getData()
  return (
    <div className="py-10 pl-5 pr-2">
      <h1 className="scroll-m-20 pb-8 text-2xl font-extrabold tracking-tight lg:text-2xl">
        Manage Orders
      </h1>
      <DataTable
        columns={columns}
        data={data}
        defaultCellStyle="align-top"
        searchableColumnHeaders={searchableColumnHeaders}
        filterByCategory={{ categories: statuses, categoryHeader: 'status' }}
      />
    </div>
  )
}
