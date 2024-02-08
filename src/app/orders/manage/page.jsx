import { promises as fs } from 'fs'
import path from 'path'
import { DataTable } from '@/components/data-table/data-table'
import { PageTitle } from '@/components/typography/PageTitle'
import { columns, searchableColumnHeaders } from './columns'
import { statuses } from './data/data'

const dateRangePicker = 'dateCreated'
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

export default async function ManageOrdersPage() {
  const data = await getData()
  const filterByCategory = { categories: statuses, categoryHeader: 'status' }
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Manage Orders</PageTitle>
      <DataTable
        columns={columns}
        controls={{
          dateRangePicker,
          filterByCategory,
          searchableColumnHeaders,
        }}
        data={data}
        defaultCellStyle="align-top"
      />
    </div>
  )
}
