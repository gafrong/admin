import { promises as fs } from 'fs'
import path from 'path'
import { columns } from './columns'
import { DataTable } from './data-table'

// Simulate a database read for products.
// Replace with a fetch call from mongodb in prod.
async function getData() {
  const data = await fs.readFile(
    // 70, 100 or 1,000 or 10,000 products:
    path.join(process.cwd(), 'src/mocks/data-100.json'),
    // path.join(process.cwd(), "src/mocks/data-100.json")
  )

  const tasks = JSON.parse(data.toString())
  return tasks
}

export default async function DemoPage() {
  const data = await getData()
  return (
    <div className="py-10 pl-5 pr-2">
      <h1 className="scroll-m-20 pb-8 text-2xl font-extrabold tracking-tight lg:text-2xl">
        Manage Orders
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
