'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function Page({ searchParams }) {
  const { data: session } = useSession()
  const token = session?.token
  const router = useRouter()
  const parsedProduct = JSON.parse(decodeURIComponent(searchParams.product))

  const [editedProduct, setEditedProduct] = useState({ ...parsedProduct })
  const [deliveryFeeOn, setDeliveryFeeOn] = useState(parsedProduct.deliveryFee)
  const [onSale, setOnSale] = useState(parsedProduct.onSale)
  const [soldout, setSoldout] = useState(parsedProduct.soldout)
  const [displayProduct, setDisplayProduct] = useState(parsedProduct.display)
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState(null)
  const [colorOptions, setColorOptions] = useState({
    hexColor: parsedProduct.colorOptions?.hexColor || '',
    productColor: parsedProduct.colorOptions?.productColor || '',
    sizes: parsedProduct.colorOptions?.sizes || [],
  })
  const [error, setError] = useState('')

  const parentCategories = [
    { id: '642d1f4406159dd4f0519464', name: '의류' },
    { id: '642d21d606159dd4f0519466', name: '슈즈' },
    { id: '642d21e706159dd4f0519468', name: '백' },
    { id: '6476e6bfac13ffbaa94db145', name: '액세서리' },
    { id: '6476e70dac13ffbaa94db147', name: '쥬얼리' },
  ]

  const allSubCategories = [
    {
      id: '642d2fc5739af8f56e40fad9',
      name: '니트',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476e7c8ac13ffbaa94db14f',
      name: '데님',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d229b06159dd4f0519471',
      name: '드레스',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d282cfca3ae56a846cf48',
      name: '바지',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d28ed734d34bef616bd73',
      name: '셔츠',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476ed09ac13ffbaa94db161',
      name: '쇼츠',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476e778ac13ffbaa94db149',
      name: '수영복 & 비치웨어',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476ed74ac13ffbaa94db167',
      name: '수트',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d3016739af8f56e40fae2',
      name: '스커트',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d3028739af8f56e40fae4',
      name: '아웃도어',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d3009739af8f56e40fae0',
      name: '자켓',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476ed9fac13ffbaa94db169',
      name: '점프수트',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476e787ac13ffbaa94db14b',
      name: '코트',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d2fbf739af8f56e40fad7',
      name: '탑',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '6476ec50ac13ffbaa94db159',
      name: '기타의류',
      parentId: '642d1f4406159dd4f0519464',
    },
    {
      id: '642d3060739af8f56e40fae9',
      name: '로퍼',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '6476e9b1ac13ffbaa94db151',
      name: '뮬',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '642d3073739af8f56e40faed',
      name: '부츠',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '6476e9edac13ffbaa94db155',
      name: '샌달',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '642d3056739af8f56e40fae7',
      name: '스니커즈',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '6476eddcac13ffbaa94db16b',
      name: '에스파드리유',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '6476ea17ac13ffbaa94db157',
      name: '펌프스',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '6476ee02ac13ffbaa94db16d',
      name: '플립플랍 & 슬리퍼',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '642d2aa91639c63ceb773ff8',
      name: '플랫',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '642d307b739af8f56e40faef',
      name: '기타슈즈',
      parentId: '642d21d606159dd4f0519466',
    },
    {
      id: '642d3117739af8f56e40fafc',
      name: '미니',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d30ae739af8f56e40faf4',
      name: '백팩',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d30f2739af8f56e40faf6',
      name: '비치',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d30a3739af8f56e40faf2',
      name: '숄더',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d3109739af8f56e40fafa',
      name: '크로스바디',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d30fc739af8f56e40faf8',
      name: '클러치',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d312b739af8f56e40fb00',
      name: '탑핸들',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '642d311f739af8f56e40fafe',
      name: '토트',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '6476ec74ac13ffbaa94db15b',
      name: '기타백',
      parentId: '642d21e706159dd4f0519468',
    },
    {
      id: '64ffcff7ad6dc608392ca791',
      name: '네크리스',
      parentId: '6476e70dac13ffbaa94db147',
    },
    {
      id: '64ffcf4fad6dc608392ca771',
      name: '링',
      parentId: '6476e70dac13ffbaa94db147',
    },
    {
      id: '64ffd038ad6dc608392ca793',
      name: '브레이슬릿',
      parentId: '6476e70dac13ffbaa94db147',
    },
    {
      id: '64ffd05aad6dc608392ca795',
      name: '이어링',
      parentId: '6476e70dac13ffbaa94db147',
    },
    {
      id: '6476ecd3ac13ffbaa94db15f',
      name: '기타주얼리',
      parentId: '6476e70dac13ffbaa94db147',
    },
    {
      id: '64ffd64bad6dc608392ca7ad',
      name: '모자',
      parentId: '6476e6bfac13ffbaa94db145',
    },
    {
      id: '64ffd671ad6dc608392ca7af',
      name: '벨트',
      parentId: '6476e6bfac13ffbaa94db145',
    },
    {
      id: '64ffd69dad6dc608392ca7b1',
      name: '스카프',
      parentId: '6476e6bfac13ffbaa94db145',
    },
    {
      id: '6476ecb1ac13ffbaa94db15d',
      name: '기타액세서리',
      parentId: '6476e6bfac13ffbaa94db145',
    },
  ]

  const [selectedParentCategory, setSelectedParentCategory] = useState(
    parentCategories.find(
      (category) => category.id === selectedParentCategoryId,
    ) || editedProduct?.category?.parentId,
  )

  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState(editedProduct?.category)

  const handleParentCategoryChange = (categoryId) => {
    const selectedCategory = parentCategories.find(
      (category) => category.id === categoryId,
    )
    const filteredSubCategories = allSubCategories.filter(
      (subCategory) => subCategory.parentId === categoryId,
    )

    setSelectedParentCategoryId(categoryId)
    setSelectedParentCategory(selectedCategory)
    setSubCategories(filteredSubCategories)

    if (filteredSubCategories.length > 0) {
      setSubCategory(filteredSubCategories[0])
    }
  }

  const handleSubCategoryChange = (categoryId) => {
    const selectedSubCategory = subCategories.find(
      (category) => category.id === categoryId,
    )
    setSubCategory(selectedSubCategory)
  }

  useEffect(() => {
    setSelectedParentCategory(
      parentCategories.find(
        (category) => category.id === selectedParentCategoryId,
      ) ||
        parentCategories.find(
          (category) => category.id === editedProduct?.category?.parentId,
        ) ||
        null,
    )
  }, [selectedParentCategoryId, editedProduct])

  useEffect(() => {
    if (selectedParentCategory) {
      const filteredSubCategories = allSubCategories.filter(
        (subCategory) => subCategory.parentId === selectedParentCategory.id,
      )
      setSubCategories(filteredSubCategories)
    } else {
      // If no parent category is selected, reset subcategories
      setSubCategories([])
    }
  }, [selectedParentCategory])

  const handleInputChange = (e, field) => {
    const inputValue = e.target.value
    if (field === 'deliveryFeeAmount' && parseFloat(inputValue) > 0) {
      setDeliveryFeeOn(true)
    }
    console.log('field', field)
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [field]: e.target.value,
    }))
  }

  const handleFeeChange = () => {
    console.log('deliveryFeeOn', deliveryFeeOn)
    const updatedSwitchValue = !deliveryFeeOn
    console.log('updatedSwitchValue', updatedSwitchValue)
    setDeliveryFeeOn(updatedSwitchValue)

    // Update the corresponding property in editedProduct
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      deliveryFee: updatedSwitchValue,
      deliveryFeeAmount: updatedSwitchValue ? prevProduct.deliveryFeeAmount : 0,
    }))
  }

  const handleDiscountChange = () => {
    const updatedDiscountValue = !onSale
    setOnSale(updatedDiscountValue)
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      onSale: updatedDiscountValue,
      discount: updatedDiscountValue ? prevProduct.discount : 0,
    }))
  }

  const handleDisplayProductChange = () => {
    setDisplayProduct((prevValue) => !prevValue)
  }

  const handleSoldoutProductChange = () => {
    const updatedSoldout = !soldout
    setSoldout(updatedSoldout)
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      soldout: updatedSoldout,
    }))
  }

  const handleColorInputChange = (e) => {
    setColorOptions((prevOptions) => ({
      ...prevOptions,
      productColor: e.target.value,
    }))
  }

  const handleStockInputChange = (e, sizeId) => {
    const inputValue = e.target.value.trim() // Remove leading and trailing whitespace
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      // Check if the input value is empty or a valid integer
      const newStockValue = inputValue === '' ? 0 : parseInt(inputValue)
      setColorOptions((prevOptions) => ({
        ...prevOptions,
        sizes: prevOptions.sizes.map((size) =>
          size._id === sizeId ? { ...size, stock: newStockValue } : size,
        ),
      }))
      setError('')
    } else {
      setError('Please enter a valid integer value or leave it empty.') // Set error message
    }
  }

  const handleColorChange = (newColor) => {
    setColorOptions((prevOptions) => ({
      ...prevOptions,
      hexColor: newColor,
    }))
  }

  const handleSubmit = () => {
    if (
      editedProduct.name == '' ||
      editedProduct.price == '' ||
      editedProduct.description == ''
    ) {
      setError('입력한 내용을 확인해주세요')
    }

    const currentDate = new Date()
    const formData = new FormData()
    formData.append('category', subCategory.id || editedProduct.category._id)
    formData.append('colorOptions', JSON.stringify(colorOptions))
    formData.append('deliveryFee', deliveryFeeOn)
    formData.append('deliveryFeeAmount', editedProduct.deliveryFeeAmount)
    formData.append('description', editedProduct.description)
    formData.append('discount', editedProduct.discount)
    formData.append('display', displayProduct)
    formData.append('dropProduct', editedProduct.dropProduct)
    formData.append('name', editedProduct.name)
    formData.append('onSale', editedProduct.onSale)
    formData.append(
      'parentCategory',
      selectedParentCategoryId || editedProduct.category.parentId,
    )
    formData.append('preorder', editedProduct.preorder)
    formData.append('price', editedProduct.price)
    formData.append('soldout', editedProduct.soldout)

    axios
      .put(`${baseURL}products/${editedProduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          router.push('/products/productedit')
        }
      })
      .catch((error) => {
        console.log('Error!!', error)
      })
  }

  return (
    <div className={`p-10 ${displayProduct ? '' : 'bg-gray-300'}`}>
      <img
        src={awsURL + editedProduct.image}
        alt={editedProduct.name}
        style={{ opacity: displayProduct ? 1 : 0.5 }}
      />
      <div className="flex pt-5">
        <p className="mr-2">Name: </p>
        <Input
          type="text"
          value={editedProduct.name}
          onChange={(e) => handleInputChange(e, 'name')}
          className=""
        />
      </div>
      <div className="flex pt-5">
        <p className="w-20">제품 설명: </p>
        <Textarea
          type="text"
          value={editedProduct.description}
          onChange={(e) => handleInputChange(e, 'description')}
        />
      </div>

      <div className="flex w-1/3 items-center pt-5">
        <p className="w-16">가격:</p>
        <Input
          type="text"
          value={editedProduct.price}
          onChange={(e) => handleInputChange(e, 'price')}
          className="w-32"
        />
        <p className="ml-2">원</p>
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-24">배송비 적용:</p>
          <Switch checked={deliveryFeeOn} onCheckedChange={handleFeeChange} />
        </div>
        {deliveryFeeOn ?
          <div className="flex w-1/2 items-center pt-5">
            <p className="w-16">배송비:</p>
            <Input
              type="text"
              value={editedProduct.deliveryFeeAmount}
              onChange={(e) => handleInputChange(e, 'deliveryFeeAmount')}
              className="w-24"
            />
            <p className="ml-2">원</p>
          </div>
        : null}
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-24">할인률 적용:</p>
          <Switch checked={onSale} onCheckedChange={handleDiscountChange} />
        </div>
        {onSale ?
          <div className="flex w-1/2 items-center pt-5">
            <p className="w-16">할인률:</p>
            <Input
              type="text"
              value={editedProduct.discount}
              onChange={(e) => handleInputChange(e, 'discount')}
              className="w-24"
            />
            <p className="ml-2">%</p>
          </div>
        : null}
      </div>
      <div className="flex w-1/2 items-center pt-5">
        <p className="w-24">상품 공개:</p>
        <Switch
          checked={displayProduct}
          onCheckedChange={handleDisplayProductChange}
        />
      </div>
      <div className="flex w-1/2 items-center pt-5">
        <p className={`w-24 ${soldout ? 'text-red-600' : ''}`}>품절:</p>
        <Switch
          checked={soldout}
          onCheckedChange={handleSoldoutProductChange}
        />
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-24">메인 카테고리:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-2" variant="outline">
                {selectedParentCategory ? selectedParentCategory.name : 'ope'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {parentCategories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onSelect={() => handleParentCategoryChange(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-24">상세 카테고리:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-2" variant="outline">
                {' '}
                {subCategory.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {subCategories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onSelect={() => handleSubCategoryChange(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex pt-5">
        <div className="flex w-1/2 items-center pt-5">
          <p className="mr-4">제품색:</p>
          <HexColorPicker
            color={colorOptions.hexColor}
            onChange={handleColorChange}
          />
        </div>
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-16">색명:</p>
          <Input
            type="text"
            value={colorOptions.productColor}
            onChange={handleColorInputChange}
            className="w-24"
          />
        </div>
      </div>
      {colorOptions.sizes.length > 0 ?
        <div className="mt-5 flex pt-5">
          <p className="mr-8">사이즈:</p>
          <div className="flex flex-col">
            {colorOptions.sizes.map((size) => (
              <div key={size._id} className="mr-4 flex">
                <p className="mb-6 mt-2 w-40">{size.size}</p>
                <p className="mr-2 mt-2">재고:</p>
                <Input
                  type="text"
                  value={size.stock}
                  onChange={(e) => handleStockInputChange(e, size._id)}
                  className="w-20"
                />{' '}
                <p className="ml-2 mt-2">개</p>
              </div>
            ))}
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      : null}
      <div className="mt-12 flex pb-80">
        <Button className="mt-8 w-60" onClick={handleSubmit}>
          편집 저장
        </Button>
      </div>
    </div>
  )
}
