'use client'

import baseURL from '@/assets/common/baseUrl'
import { LoadingSpinnerButton } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import axios from 'axios'
import React from 'react'
import { CardTitleDescription } from '../../_components/card-title-description'

export function DEBUG_DeletePendingAccount({ token, mutate, userId }) {
  const [isLoading, setIsLoading] = React.useState(false)

  const deletePendingBank = async () => {
    setIsLoading(true)
    console.log('Deleting pending bank account')
    const URL_ENDPOINT = `${baseURL}vendor/bank-account/pending/${userId}`
    const headers = { Authorization: `Bearer ${token}` }
    try {
      const response = await axios.delete(URL_ENDPOINT, { headers })
      if (response.status === 200) {
        console.log('Pending bank account deleted successfully')
        mutate()
      }
    } catch (error) {
      console.error('Error deleting pending bank account::', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={deletePendingBank}>
      Delete Pending Bank Account
      {isLoading ?
        <LoadingSpinnerButton />
      : ''}
    </Button>
  )
}

export function DEBUG_PromotePendingAccount({ token, mutate, userId }) {
  const [isLoading, setIsLoading] = React.useState(false)

  const promotePendingBank = async () => {
    setIsLoading(true)
    console.log('Promoting pending bank account')
    const URL_ENDPOINT = `${baseURL}vendor/bank-account/pending/${userId}/approve`
    const headers = { Authorization: `Bearer ${token}` }
    try {
      const response = await axios.patch(URL_ENDPOINT, {}, { headers }) // assuming the request type is POST
      mutate() // trigger a revalidation (refetch) to update the state
    } catch (error) {
      console.error('Error promoting pending bank account:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={promotePendingBank}>
      Promote Pending Bank Account
      {isLoading ?
        <LoadingSpinnerButton />
      : ''}
    </Button>
  )
}

export function DEBUG_PromotePendingDocument({ token, mutate, userId }) {
  const [isLoading, setIsLoading] = React.useState(false)

  const promotePendingDocument = async () => {
    setIsLoading(true)
    console.log('Promoting pending document')
    const URL_ENDPOINT = `${baseURL}vendor/document/pending/${userId}/approve`
    const headers = { Authorization: `Bearer ${token}` }
    try {
      const response = await axios.patch(URL_ENDPOINT, {}, { headers })
      mutate() // trigger a revalidation (refetch) to update the state
    } catch (error) {
      console.error('Error promoting pending document:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={promotePendingDocument}>
      Promote Pending Document
      {isLoading ?
        <LoadingSpinnerButton />
      : ''}
    </Button>
  )
}

export function DEBUG_DeleteBankHistory({ token, mutate, userId }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const deleteBankHistory = async () => {
    setIsLoading(true)
    const URL_ENDPOINT = `${baseURL}vendor/bank-account/history/${userId}`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.delete(URL_ENDPOINT, { headers })
      if (response.status === 200) {
        alert('Bank history deleted successfully')
        mutate()
      }
    } catch (error) {
      console.error('Error deleting bank history', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={deleteBankHistory}>
      Delete Bank History
      {isLoading ?
        <LoadingSpinnerButton />
      : ''}
    </Button>
  )
}

export function DEBUG_DeleteDocumentHistory({ token, mutate, userId }) {
  const [isLoading, setIsLoading] = React.useState(false)

  const deleteDocumentHistory = async () => {
    setIsLoading(true)
    const URL_ENDPOINT = `${baseURL}vendor/document-history/${userId}`
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.delete(URL_ENDPOINT, { headers })
      if (response.status === 200) {
        alert('Document history deleted successfully')
        mutate()
      }
    } catch (error) {
      console.error('Error deleting document history', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={deleteDocumentHistory}>
      Delete Document History
      {isLoading ?
        <LoadingSpinnerButton />
      : ''}
    </Button>
  )
}

export function DebuggingTools({ refetchVendor, token, userId }) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (!isDevelopment) return null
  return (
    <Card className="mx-auto mt-10 max-w-screen-xl p-6 pt-0">
      <CardTitleDescription
        title="Debugging Tools"
        description="Not shown in production"
      />
      <div className="flex flex-wrap gap-6 p-6">
        <DEBUG_DeletePendingAccount
          mutate={refetchVendor}
          token={token}
          userId={userId}
        />
        <DEBUG_DeleteBankHistory
          mutate={refetchVendor}
          token={token}
          userId={userId}
        />
        <DEBUG_DeleteDocumentHistory
          mutate={refetchVendor}
          token={token}
          userId={userId}
        />
        <DEBUG_PromotePendingAccount
          mutate={refetchVendor}
          token={token}
          userId={userId}
        />
        <DEBUG_PromotePendingDocument
          mutate={refetchVendor}
          token={token}
          userId={userId}
        />
      </div>
    </Card>
  )
}
