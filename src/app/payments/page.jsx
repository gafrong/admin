import { DataTable } from "./data-table"
import { columns } from "./columns";
import { data } from "./data";
import { promises as fs } from "fs"
import path from "path"
// async function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

// Simulate a database read for tasks.
async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/payments/data.json")
  )

  const tasks = JSON.parse(data.toString())
return tasks
  // return z.array(taskSchema).parse(tasks)
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
