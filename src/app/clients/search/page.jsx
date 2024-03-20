import { PageTitle } from '@/components/typography/PageTitle'
import { SearchCustomers } from './table-clients'

export default function Page() {
  return (
    <div className="py-10 pl-5 pr-2">
      <PageTitle>Search Customer</PageTitle>
      <SearchCustomers />
    </div>
  )
}
