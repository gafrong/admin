import React from 'react'
import SuperuserList from './superuser-list'

export default function SuperuserPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Superuser Support Queries</h1>
      <SuperuserList />
    </div>
  )
}
