'use client'

import { useFetchOrderItems } from '@/app/orders/manage/use-fetch-order-items'
import { DataTable } from '@/components/data-table/data-table'
import useUserStore from '@/store/zustand'
import React, { useEffect, useState } from 'react'
import { columns, searchableColumnHeaders } from './columns'

// const unique = (arrayWithDuplicates) => [...new Set(arrayWithDuplicates)]
const unique = (arrayWithDuplicates) => [...new Set(arrayWithDuplicates)]

const getClients = ({ orderItems, vendorId }) => {
  const clientOrderItems = orderItems.filter(
    (item) => item.sellerId === vendorId,
  )
  const buyers = clientOrderItems.map((item) => item.buyer)
  const ids = unique(buyers.map((buyer) => buyer.id))
  const clients = ids.map((id) => buyers.find((buyer) => buyer.id === id))
  return clients
}

export function SearchCustomers() {
  const [users, setUsers] = useState([])
  const setStoreClients = useUserStore((state) => state.setClients)
  const { orderItems, isLoading, refetchTableData, vendorId } =
    useFetchOrderItems()

  useEffect(() => {
    const clients = getClients({ orderItems, vendorId })
    setStoreClients(clients)
    setUsers(clients)
  }, [orderItems, vendorId, setStoreClients])

  const controls = {
    isSearchAlwaysShown: true,
    searchableColumnHeaders,
  }

  return (
    <DataTable
      columns={columns}
      controls={controls}
      data={users}
      defaultCellStyle="align-top"
      isLoading={isLoading}
      refetchTableData={refetchTableData}
    />
  )
}

const exampleCustomer = {
  checkForAdminRegistration: false,
  submitted: false,
  _id: '635880d8bb016260c83d72de',
  name: 'Thomas',
  email: 'tom@mail.com',
  isAdmin: true,
  image: 'profiles/f5f06c02-5ae6-43c8-8d03-5ae6f0c57ace',
  role: 'admin',
  __v: 5,
  username: 'thomasusername',
  brand: 'SICK BRAND',
  brandDescription: 'sjadkl sajdkfla ajksfl ajskdlfaj jaksldf ajlkdsfjaklsdfj',
  videos: ['6388627986f59528a9c36469', '638863255806a150bb396a95'],
  following: {
    '635880d8bb016260c83d72de': true,
  },
  followers: {
    '635880d8bb016260c83d72de': true,
    '6369e336bada7fee40de1ba5': true,
  },
  likes: {
    '6369e336bada7fee40de1ba5': true,
    '640a9d7767e57a62dfbf835e': true,
    '6566be593a7d951fa92eb1da': true,
    '6566c19ebca82408cb70bcf2': true,
  },
  link: 'www.test.com',
  phone: '15771577',
  gender: 'none',
  birthday: '1980년 07월 11일',
  bookmarkProdducts: [],
  adresses: [],
  bookmarkProducts: ['64b0c1b082fefd4d6d8c5bf8'],
  savedProducts: [],
  savedVideos: [],
  searchWords: [],
  verified: true,
  id: '635880d8bb016260c83d72de',
}

const exampleOrderItem = {
  _id: '65fa80e348fae87cefe679be',
  product: {
    colorOptions: {
      hexColor: '#ffff00',
      productColor: '옐로우',
      sizes: [
        {
          size: 'small',
          stock: 50,
          soldout: true,
          _id: '65c1a83404bffeac66dedce3',
        },
        {
          size: 'medium',
          stock: 46,
          soldout: true,
          _id: '65c1a83404bffeac66dedce4',
        },
        {
          size: 'large',
          stock: 50,
          soldout: true,
          _id: '65c1a83404bffeac66dedce5',
        },
      ],
    },
    subOption1: null,
    subOption2: null,
    subOption3: null,
    _id: '65c1a83404bffeac66dedce2',
    name: 'ski11111',
    sellerId: '6369e336bada7fee40de1ba5',
    description: 'nina skiing22222',
    richDescription: 'richDescription example',
    image: 'products/ec0d6500-759a-4df8-96b8-b362143f2716',
    productImages: [
      'products/ec0d6500-759a-4df8-96b8-b362143f2716',
      'products/9c338c16-a23b-4ce6-b963-086aa47de221',
    ],
    brand: '',
    price: 15000,
    parentCategory: '642d1f4406159dd4f0519464',
    category: '642d3009739af8f56e40fae0',
    rating: 0,
    numReviews: 0,
    dropProduct: false,
    isFeatured: false,
    likes: {},
    bookmarks: {},
    hasStocks: false,
    delivery: '',
    topSeller: false,
    display: true,
    soldout: false,
    justin: false,
    dropDate: '2024-02-06T03:32:04.661Z',
    createdBy: '6369e336bada7fee40de1ba5',
    onSale: false,
    discount: 0,
    salesQuantity: 0,
    deliveryFee: true,
    deliveryFeeAmount: 3000,
    preorder: false,
    slug: '1707190324661',
    reviews: [],
    dateCreated: '2024-02-06T03:32:04.661Z',
    __v: 0,
    sku: '',
    id: '65c1a83404bffeac66dedce2',
  },
  paidPrice: 15000,
  deliveryFeeAmount: 3000,
  quantity: 1,
  address: {
    _id: '6409a1a08b42e97bf0fafbb2',
    name: 'home',
    phone: '2132313123',
    shippingAddress1: '서울 강남구 논현동 11  [06039]',
    shippingAddress2: '22',
    deliveryNote: '123132',
    userId: '6369e336bada7fee40de1ba5',
    isDefault: true,
    __v: 0,
    id: '6409a1a08b42e97bf0fafbb2',
  },
  buyer: {
    _id: '6369e336bada7fee40de1ba5',
    name: '이지지',
    email: 'q@mail.com',
    phone: '123',
    image: 'profiles/53f43df8-9114-40b0-8bea-661f006e817d',
    username: 'bitcoin',
    id: '6369e336bada7fee40de1ba5',
  },
  sellerId: '6369e336bada7fee40de1ba5',
  orderNumber: '6866348627555414',
  parentOrderId: '65fa80e348fae87cefe679bc',
  orderStatus: [
    {
      type: '결제완료',
      date: '2024-03-20T06:23:31.422Z',
      isCompleted: true,
      _id: '65fa80e348fae87cefe679bf',
    },
    {
      type: '준비중',
      isCompleted: false,
      _id: '65fa80e348fae87cefe679c0',
      date: '2024-03-20T06:23:31.422Z',
    },
    {
      type: '배송중',
      isCompleted: false,
      _id: '65fa80e348fae87cefe679c1',
      date: '2024-03-20T06:23:31.422Z',
    },
    {
      type: '배송완료',
      isCompleted: false,
      _id: '65fa80e348fae87cefe679c2',
      date: '2024-03-20T06:23:31.422Z',
    },
  ],
  selectedColor: '옐로우',
  selectedSize: 'medium',
  subOption1: '',
  subOption2: '',
  subOption3: '',
  isFinal: false,
  isCanceled: true,
  dateOrdered: '2024-03-20T06:23:31.422Z',
  __v: 0,
}
