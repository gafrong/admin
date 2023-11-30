import { DataTable } from "./data-table";
import { columns } from "./columns";
import { promises as fs } from "fs";
import path from "path";

// Simulate a database read for products.  
// Replace with a fetch call from mongodb in prod.
async function getData() {
  const data = await fs.readFile(
    // 100 or 1000 or 10,000 products:
    path.join(process.cwd(), "src/mocks/data-1000.json")
    // path.join(process.cwd(), "src/mocks/data-100.json")
  );

  const tasks = JSON.parse(data.toString());
  return tasks;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container-off mx-aut-offo py-10-off pl-5 pt-10 pr-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}