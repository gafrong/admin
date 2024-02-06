'use client'

import baseURL from '@/assets/common/baseUrl'
import { DataTable } from '@/components/data-table/data-table'
import LoadingSpinner from '@/components/LoadingSpinner'
import { PageTitle } from '@/components/typography/PageTitle'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Question from './question'

export default function Page() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state?.token)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const vendorId = user?._id
  console.log('questions', questions)
  useEffect(() => {
    axios
      .get(`${baseURL}questions/vendor/${vendorId}`, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` }
      })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('서버 연결에 문제가 있습니다:',error.message)
        setLoading(false);
      })
  },[token])

  return (
    <div className="pl-5 pt-5">
      <h1>고객 문의</h1>
      <div className="questions-list">
        <div className='flex row'>
          <p className='w-36'>제품</p>
          <p className='w-40'>제목</p>
          <p className='w-48'>내용</p>
          <p className='w-64'>고객</p>
          <p className='w-28'>날짜</p>
        </div>
        {questions.map((question, index) => (
          <Question key={index} question={question} />
        ))}
      </div>
    </div>
  )
}
