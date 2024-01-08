'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import useUserStore from '@/store/zustand'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
  const user = useUserStore((state) => state.user)
  const userId = user?._id
  const token = useUserStore((state) => state.token)
  const [loading, setLoading] = useState(false)
  const [totalSales, setTotalSales] = useState({})
  const today = totalSales?.totalDailySale
  const yday = totalSales?.totalPreviousDaySale
  const twoDaysAgo = totalSales?.totalDayBeforeYesterdaySale
  const threeDaysAgo = totalSales?.totalPrevious3DaySale
  const fourDaysAgo = totalSales?.totalPrevious4DaySale
  const fiveDaysAgo = totalSales?.totalPrevious5DaySale
  const sixDaysAgo = totalSales?.totalPrevious6DaySale
  const weeklySale = totalSales?.totalWeeklySale
  const monthlySale = totalSales?.totalMonthlySale
  const stats = [
    {
      name: '오늘 매출',
      value: today?.[0]?.totalPaidSale.toLocaleString() ?? 0,
      index: 0,
    },
    {
      name: '주 매출',
      value: weeklySale?.[0]?.totalPaidSale.toLocaleString() ?? 0,
      index: 1,
    },
    {
      name: '월 매출',
      value: monthlySale?.[0]?.totalPaidSale.toLocaleString() ?? 0,
      index: 2,
    },
    {
      name: '총 매출',
      value: totalSales?.totalSale?.[0]?.totalPaidSale.toLocaleString() ?? 0,
      index: 3,
    },
  ]

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${baseURL}orders/seller/${userId}/totalSales`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalSales(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('서버 연결에 문제가 있습니다:', error.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading ?
        <LoadingSpinner />
      : <main>
          <div className="relative isolate overflow-hidden">
            {/* Stats */}
            <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
              <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                {stats.map((stat, statIdx) => (
                  <div
                    key={uuidv4()}
                    className={classNames(
                      statIdx % 2 === 1 ? 'sm:border-l'
                      : statIdx === 2 ? 'lg:border-l'
                      : '',
                      'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8',
                    )}
                  >
                    <dt className="text-sm font-medium leading-6 text-gray-500">
                      {stat.name}
                    </dt>
                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                      {stat.value}원
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
              aria-hidden="true"
            >
              <div
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                style={{
                  clipPath:
                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                }}
              />
            </div>
          </div>
          {/* 7 days sale */}
          <div className="space-y-16 py-16 xl:space-y-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    매출 추의
                  </h2>
                </div>
                <table className="mt-8 min-w-full divide-y divide-gray-200 border border-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Today
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        This Month
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-gray-200 px-6 py-4">
                        Revenue
                      </td>
                      <td className="border-b border-gray-200 px-6 py-4">
                        {today?.totalPaidSale || 0}원
                      </td>
                      <td className="border-b border-gray-200 px-6 py-4">
                        {monthlySale?.[0]?.totalPaidSale || 0}원
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 px-6 py-4">
                        Payment
                      </td>
                      <td className="border-b border-gray-200 px-6 py-4">
                        {today?.totalPaidSale || 0}원
                      </td>
                      <td className="border-b border-gray-200 px-6 py-4">
                        {monthlySale?.[0]?.totalPaidSale || 0}원
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 px-6 py-4">
                        Canceled
                      </td>
                      <td className="border-b border-gray-200 px-6 py-4">
                        {today?.totalCanceled || 0}원
                      </td>
                      <td className="border-b border-gray-200 px-6 py-4">
                        {totalSales?.totalCanceledLast30Days?.[0]
                          ?.totalPaidSaleCancelled || 0}
                        원
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-16 py-16 xl:space-y-20">
            {/* Recent client list*/}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    최근 구매 고객
                  </h2>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                    <span className="sr-only">, clients</span>
                  </a>
                </div>
                <ul
                  role="list"
                  className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
                >
                  {totalSales?.latestBuyers?.map((client) => (
                    <li
                      key={uuidv4()}
                      className="overflow-hidden rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img
                          src={awsURL + client.buyer.image}
                          alt={client.buyer.name}
                          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                        />
                        <div className="text-sm font-medium leading-6 text-gray-900">
                          {client.buyer.name}
                        </div>
                      </div>
                      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">
                            {client.buyer.email}
                          </dt>
                          <dd className="text-gray-700"></dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">
                            {client.buyer.username}
                          </dt>
                          <dd className="flex items-start gap-x-2"></dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      }
    </>
  )
}
