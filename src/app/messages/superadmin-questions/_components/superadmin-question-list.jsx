'use client'

import { useSuperadminQuestions } from '@/app/messages/superadmin-questions/api'
import { DataTable } from '@/components/data-table/data-table'
import { hasSuperAdminRole } from '@/utils/user-utils'
import { useSession } from 'next-auth/react'
import { controls, getColumns } from './columns'

export function SuperadminQuestionList() {
  const { data: session } = useSession()
  const isSuperAdmin = hasSuperAdminRole(session?.user)
  const {
    data: queries,
    error,
    isLoading,
    mutate: refetchQueries,
  } = useSuperadminQuestions(isSuperAdmin)

  const columns = getColumns(isSuperAdmin)

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={queries}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchQueries}
    />
  )
}
