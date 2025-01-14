'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import DateTimePicker from 'react-datetime-picker'
import { CiCamera } from 'react-icons/ci'
import styles from './productregister.module.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import baseURL from '@/assets/common/baseUrl'
import LoadingSpinner from '@/components/LoadingSpinner'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Page() {
  const { data: session } = useSession()
  const userId = session?.user?._id
  const token = session?.token
  const router = useRouter()

  const [mainImage, setMainImage] = useState(null)
  const [firstImage, setFirstImage] = useState('')
  const [secondImage, setSecondImage] = useState('')
  const [thirdImage, setThirdImage] = useState('')
  const [fourthImage, setFourthImage] = useState('')

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [error, setError] = useState(null)
  const [deliveryFeeOn, setDeliveryFeeOn] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [discountRate, setDiscountRate] = useState(0)
  const [displayProduct, setDisplayProduct] = useState(true)
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState(
    '642d1f4406159dd4f0519464',
  )
  const [color, setColor] = useState('')
  const [productColor, setProductColor] = useState('')
  const [preorder, setPreorder] = useState(false)

  const [isDropProduct, setIsDropProduct] = useState(false)
  const currentDate = new Date()
  const [date, setDate] = useState(null)
  const [dropDate, setDropDate] = useState(new Date())
  const [isSoldout, setIsSoldout] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [deliveryFeeAmount, setDeliveryFeeAmount] = useState(0)

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
    ) || product?.category?.parentId,
  )

  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState('')

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
          (category) => category.id === product?.category?.parentId,
        ) ||
        null,
    )
  }, [selectedParentCategoryId])

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

  useEffect(() => {
    if (dropDate > currentDate) {
      setIsSoldout(true)
      setIsDropProduct(true)
    } else {
      setIsSoldout(false)
      setIsDropProduct(false)
    }
  }, [dropDate])

  const handleMainImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type })
        setMainImage(blob)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleFirstImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type })
        setFirstImage(blob)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleSecondImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type })
        setSecondImage(blob)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleThirdImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type })
        setThirdImage(blob)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleFourthImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type })
        setFourthImage(blob)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleInputChange = (e, field) => {
    const inputValue = e.target.value
    if (field === 'deliveryFeeAmount' && parseFloat(inputValue) > 0) {
      setDeliveryFeeOn(true)
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: e.target.value,
    }))
  }

  const handleFeeChange = () => {
    const updatedSwitchValue = !deliveryFeeOn
    setDeliveryFeeOn(updatedSwitchValue)

    setProduct((prevProduct) => ({
      ...prevProduct,
      deliveryFee: updatedSwitchValue,
      deliveryFeeAmount: updatedSwitchValue ? deliveryFeeAmount : 0,
    }))
  }

  useEffect(() => {
    if (!onSale) {
      setDiscountRate(0)
    }
  }, [onSale])

  const handleDiscountChange = () => {
    setOnSale((prevValue) => !prevValue)
  }

  const handleDiscountRate = (e) => {
    console.log('discount rate', e.target.value)
    const value = e.target.value
    const discountValue = value / 100
    console.log('rate', discountValue)
    setDiscountRate(discountValue)
  }

  const handleDisplayProductChange = () => {
    setDisplayProduct((prevValue) => !prevValue)
  }

  const handlePreorderProductChange = () => {
    setPreorder((prevValue) => !prevValue)
  }

  const handleSoldoutProductChange = () => {
    setIsSoldout((prevIsSoldout) => !prevIsSoldout)
  }

  const handleColorInputChange = (e) => {
    setProductColor(e.target.value)
  }

  const handleColorHexInputChange = (e) => {
    console.log('hex color', e)
    setColor(e)
  }

  // Add Sizes and Remove Sizes options
  const [sizes, setSizes] = useState([{ size: '', stock: '' }])
  const [colorOptions, setColorOptions] = useState({})

  const [sizeValues, setSizeValues] = useState([])
  const [stockValues, setStockValues] = useState([])

  const [options1, setOptions1] = useState([])
  const [options2, setOptions2] = useState([])
  const [options3, setOptions3] = useState([])
  const [subOption1, setSubOption1] = useState({})
  const [subOption2, setSubOption2] = useState({})
  const [subOption3, setSubOption3] = useState({})

  const [option1Title, setOption1Title] = useState('옵션 1')
  const [option2Title, setOption2Title] = useState('옵션 2')
  const [option3Title, setOption3Title] = useState('옵션 3')

  const [option1Names, setOption1Names] = useState([])
  const [option2Names, setOption2Names] = useState([])
  const [option3Names, setOption3Names] = useState([])
  const [option1Values, setOption1Values] = useState([])
  const [option2Values, setOption2Values] = useState([])
  const [option3Values, setOption3Values] = useState([])

  const handleOption1Change = (e) => {
    setOption1Title(e.target.value)
  }

  const handleOption2Change = (e) => {
    setOption2Title(e.target.value)
  }

  const handleOption3Change = (e) => {
    setOption3Title(e.target.value)
  }

  const handleAddSize = (size, stock) => {
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes]
      updatedSizes.push({ size, stock })
      return updatedSizes
    })
    setSizeValues((prevSizeValues) => {
      const updatedSizeValues = [...prevSizeValues, size]
      return updatedSizeValues
    })

    setStockValues((prevStockValues) => {
      const updatedStockValues = [...prevStockValues, stock]
      return updatedStockValues
    })
  }

  const handleRemoveSize = () => {
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes]
      updatedSizes.pop() // Remove the last added size
      return updatedSizes
    })

    setSizeValues((prevSizeValues) => {
      const updatedSizeValues = [...prevSizeValues]
      updatedSizeValues.pop() // Remove the last added size value
      return updatedSizeValues
    })

    setStockValues((prevStockValues) => {
      const updatedStockValues = [...prevStockValues]
      updatedStockValues.pop() // Remove the last added stock value
      return updatedStockValues
    })
  }

  const addOption1 = () => {
    setOptions1((prevOptions) => [
      ...prevOptions,
      { optionName: '', optionValue: '' },
    ])
  }

  const addOption2 = () => {
    setOptions2((prevOptions) => [
      ...prevOptions,
      { optionName: '', optionValue: '' },
    ])
  }

  const addOption3 = () => {
    setOptions3((prevOptions) => [
      ...prevOptions,
      { optionName: '', optionValue: '' },
    ])
  }

  const removeOption1 = () => {
    setOptions1((prevOptions) => {
      if (prevOptions.length > 0) {
        prevOptions[prevOptions.length - 1].optionName = ''
        prevOptions[prevOptions.length - 1].optionValue = ''

        prevOptions.pop()
      }

      return [...prevOptions]
    })
  }

  const removeOption2 = () => {
    setOptions2((prevOptions) => {
      if (prevOptions.length > 0) {
        prevOptions[prevOptions.length - 1].optionName = ''
        prevOptions[prevOptions.length - 1].optionValue = ''

        prevOptions.pop()
      }

      return [...prevOptions]
    })
  }

  const removeOption3 = () => {
    setOptions3((prevOptions) => {
      if (prevOptions.length > 0) {
        prevOptions[prevOptions.length - 1].optionName = ''
        prevOptions[prevOptions.length - 1].optionValue = ''

        prevOptions.pop()
      }

      return [...prevOptions]
    })
  }

  useEffect(() => {
    const selectedColorOptions = {
      productColor: productColor ? productColor : '',
      hexColor: color ? color : '#ffffff',
      sizes: sizes.map((_, index) => ({
        size: sizeValues[index],
        stock: stockValues[index],
      })),
    }
    setColorOptions(selectedColorOptions)
  }, [sizeValues, stockValues, productColor, color, sizes])

  useEffect(() => {
    const selectedOptions1 = {
      title: option1Title,
      options: options1.map((option, index) => ({
        name: option1Names[index],
        value: option1Values[index],
      })),
    }

    const hasOptionValues = option1Values.some((value) => value !== '')

    if (hasOptionValues) {
      setSubOption1(selectedOptions1)
    }
  }, [option1Names, option1Values, option1Title, options1])

  useEffect(() => {
    const selectedOptions2 = {
      title: option2Title,
      options: options2.map((option, index) => ({
        name: option2Names[index],
        value: option2Values[index],
      })),
    }

    const hasOptionValues = option2Values.some((value) => value !== '')

    if (hasOptionValues) {
      setSubOption2(selectedOptions2)
    }
  }, [option2Names, option2Values, option2Title, options2])

  useEffect(() => {
    const selectedOptions3 = {
      title: option3Title,
      options: options3.map((option, index) => ({
        name: option3Names[index],
        value: option3Values[index],
      })),
    }

    const hasOptionValues = option3Values.some((value) => value !== '')

    if (hasOptionValues) {
      setSubOption3(selectedOptions3)
    }
  }, [option3Names, option3Values, option3Title, options3])

  const handleProductSell = (value) => {
    if (value === 'selllater') {
      setIsDropProduct(true)
    } else {
      setIsDropProduct(false)
      setDropDate(null)
      setDate(null)
    }
  }

  const handleSellDate = (newDate) => {
    setDropDate(newDate)
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul',
    }
    const formattedDate = newDate.toLocaleString('en-US', options)
    setDate(formattedDate)
  }

  const handleDeliveryFee = (e) => {
    setDeliveryFeeAmount(e.target.value)
  }

  const handleSubmit = () => {
    setLoading(true)
    if (
      product.name == '' ||
      product.price == '' ||
      product.description == '' ||
      product.selectedCategory == ''
    ) {
      setError('Please fill in the form correctly')
    }

    const formData = new FormData()
    const images = [mainImage, firstImage, secondImage, thirdImage, fourthImage]

    for (let i = 0; i < images.length; i++) {
      const img = images[i]

      if (img instanceof Blob) {
        formData.append('image', img, `image${i + 1}.jpg`)
      }
    }

    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('description', product.description)
    formData.append('parentCategory', selectedParentCategory.id)
    formData.append('category', subCategory.id)
    formData.append('richDescription', 'richDescription example')
    formData.append('rating', product.rating)
    formData.append('numReviews', product.numReviews)
    formData.append('isFeatured', isFeatured)
    formData.append('colorOptions', JSON.stringify(colorOptions))
    formData.append('onSale', onSale)
    formData.append('discount', discountRate)
    formData.append('soldout', isSoldout)
    formData.append('display', displayProduct)
    formData.append('deliveryFee', deliveryFeeOn)
    formData.append('deliveryFeeAmount', deliveryFeeAmount)
    formData.append('sellerId', userId)
    formData.append('preorder', preorder)

    if (dropDate > currentDate) {
      formData.append('dropProduct', isDropProduct)
    }

    if (isDropProduct) {
      formData.append('dropDate', dropDate.toISOString())
    }

    if (subOption1 !== '') {
      formData.append('subOption1', JSON.stringify(subOption1))

      if (subOption2 !== '') {
        formData.append('subOption2', JSON.stringify(subOption2))
      } else {
        formData.append('subOption2', null)
        formData.append('subOption3', null)
      }

      if (subOption3 !== '') {
        formData.append('subOption3', JSON.stringify(subOption3))
      } else {
        formData.append('subOption3', null)
      }
    } else {
      formData.append('subOption1', null)
      formData.append('subOption2', null)
      formData.append('subOption3', null)
    }

    axios
      .post(`${baseURL}products/create`, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setLoading(false)
        }
        router.push('/products/product-add-complete')
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading ?
        <LoadingSpinner />
      : <div className={`p-10 ${displayProduct ? '' : 'bg-gray-300'}`}>
          <div className="flex">
            <div>
              {mainImage ?
                <div>
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="main image"
                    style={{
                      opacity: displayProduct ? 1 : 0.5,
                      width: '250px',
                      height: '250px',
                      objectFit: 'cover',
                    }}
                  />
                  <label htmlFor="mainImageInput" className={styles.mainLabel}>
                    <CiCamera className={styles.mainImageCamera} />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="mainImage"
                    id="mainImageInput"
                    style={{ display: 'none' }}
                    onChange={handleMainImageChange}
                  />
                </div>
              : <div className={styles.mainImageBlank}>
                  <label
                    htmlFor="mainImageInput"
                    className={styles.mainLabelStart}
                  >
                    제품 이미지 <CiCamera className={styles.cameraCenter} />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="mainImage"
                    id="mainImageInput"
                    style={{ display: 'none' }}
                    onChange={handleMainImageChange}
                  />
                </div>
              }
            </div>
            <div className={styles.productImageContainer}>
              {mainImage && (
                <>
                  {firstImage ?
                    <div className={styles.productImageShow}>
                      <img
                        src={URL.createObjectURL(firstImage)}
                        alt="first image"
                        style={{
                          opacity: displayProduct ? 1 : 0.5,
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                      <label
                        htmlFor="firstImageInput"
                        className={styles.firstLabel}
                      >
                        <CiCamera className={styles.firstImageCamera} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="firstImage"
                        id="firstImageInput"
                        style={{ display: 'none' }}
                        onChange={handleFirstImageChange}
                      />
                    </div>
                  : <div className={styles.productImage}>
                      <label
                        htmlFor="firstImageInput"
                        className={styles.labelFirst}
                      >
                        <CiCamera className={styles.smallCameraCenter} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="firstImage"
                        id="firstImageInput"
                        style={{ display: 'none' }}
                        onChange={handleFirstImageChange}
                      />
                    </div>
                  }
                </>
              )}

              {mainImage && firstImage && (
                <>
                  {secondImage ?
                    <div className={styles.productImageShow}>
                      <img
                        src={URL.createObjectURL(secondImage)}
                        alt="second image"
                        style={{
                          opacity: displayProduct ? 1 : 0.5,
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                      <label
                        htmlFor="secondImageInput"
                        className={styles.firstLabel}
                      >
                        <CiCamera className={styles.firstImageCamera} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="secondImage"
                        id="secondImageInput"
                        style={{ display: 'none' }}
                        onChange={handleSecondImageChange}
                      />
                    </div>
                  : <div className={styles.productImage}>
                      <label
                        htmlFor="secondImageInput"
                        className={styles.labelFirst}
                      >
                        <CiCamera className={styles.smallCameraCenter} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="secondImage"
                        id="secondImageInput"
                        style={{ display: 'none' }}
                        onChange={handleSecondImageChange}
                      />
                    </div>
                  }
                </>
              )}

              {mainImage && firstImage && secondImage && (
                <>
                  {thirdImage ?
                    <div className={styles.productImageShow}>
                      <img
                        src={URL.createObjectURL(thirdImage)}
                        alt="third image"
                        style={{
                          opacity: displayProduct ? 1 : 0.5,
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                      <label
                        htmlFor="thirdImageInput"
                        className={styles.firstLabel}
                      >
                        <CiCamera className={styles.firstImageCamera} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="thirdImage"
                        id="thirdImageInput"
                        style={{ display: 'none' }}
                        onChange={handleThirdImageChange}
                      />
                    </div>
                  : <div className={styles.productImage}>
                      <label
                        htmlFor="thirdImageInput"
                        className={styles.labelFirst}
                      >
                        <CiCamera className={styles.smallCameraCenter} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="thirdImage"
                        id="thirdImageInput"
                        style={{ display: 'none' }}
                        onChange={handleThirdImageChange}
                      />
                    </div>
                  }
                </>
              )}

              {mainImage && firstImage && secondImage && thirdImage && (
                <>
                  {fourthImage ?
                    <div className={styles.productImageShow}>
                      <img
                        src={URL.createObjectURL(fourthImage)}
                        alt="fourth image"
                        style={{
                          opacity: displayProduct ? 1 : 0.5,
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                      <label
                        htmlFor="fourthImageInput"
                        className={styles.firstLabel}
                      >
                        <CiCamera className={styles.firstImageCamera} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="fourthImage"
                        id="fourthImageInput"
                        style={{ display: 'none' }}
                        onChange={handleFourthImageChange}
                      />
                    </div>
                  : <div className={styles.productImage}>
                      <label
                        htmlFor="fourthImageInput"
                        className={styles.labelFirst}
                      >
                        <CiCamera className={styles.smallCameraCenter} />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="fourthImage"
                        id="fourthImageInput"
                        style={{ display: 'none' }}
                        onChange={handleFourthImageChange}
                      />
                    </div>
                  }
                </>
              )}
            </div>
          </div>

          <div className="flex pt-5">
            <p className="w-36">
              제품명:{' '}
              <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
            </p>
            <Input
              type="text"
              placeholder="예) 슬림 반팔 티셔츠"
              value={product.name || ''}
              onChange={(e) => handleInputChange(e, 'name')}
              className=""
            />
          </div>
          <div className="flex pt-5">
            <p className="w-36">
              제품 설명:{' '}
              <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
            </p>
            <Textarea
              type="text"
              placeholder="예) 절개 없이 드레이프 되는 세련된 넥라인과 캡소매 디자인으로 여성스럽고 도시적인 느낌의 티셔츠입니다."
              value={product.description || ''}
              rows={10}
              onChange={(e) => handleInputChange(e, 'description')}
            />
          </div>

          <div className="flex w-1/3 items-center pt-5">
            <p className="w-32">
              가격:{' '}
              <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
            </p>
            <Input
              type="number"
              placeholder="예) 50000"
              value={product?.price?.toLocaleString() || ''}
              onChange={(e) => handleInputChange(e, 'price')}
              className="w-32"
            />
            <p className="ml-2">원</p>
          </div>
          <div className="flex">
            <div className="flex w-1/2 items-center pt-5">
              <p className="w-48">
                배송비 적용: <span style={{ fontSize: '13px' }}>(선택)</span>
              </p>
              <Switch
                checked={deliveryFeeOn}
                onCheckedChange={handleFeeChange}
              />
            </div>
            {deliveryFeeOn ?
              <div className="flex w-1/2 items-center pt-5">
                <p className="w-28">
                  배송비:{' '}
                  <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
                </p>
                <Input
                  type="number"
                  value={deliveryFeeAmount}
                  onChange={handleDeliveryFee}
                  className="w-24"
                />
                <p className="ml-2">원</p>
              </div>
            : null}
          </div>
          <div className="flex">
            <div className="flex w-1/2 items-center pt-5">
              <p className="w-48">
                할인률 적용: <span style={{ fontSize: '13px' }}>(선택)</span>
              </p>
              <Switch checked={onSale} onCheckedChange={handleDiscountChange} />
            </div>
            {onSale ?
              <div className="flex w-1/2 items-center pt-5">
                <p className="w-28">
                  할인률:{' '}
                  <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
                </p>
                <Input
                  type="number"
                  // value={product.discount || ''}
                  onChange={handleDiscountRate}
                  className="w-24"
                />
                <p className="ml-2">%</p>
              </div>
            : null}
          </div>
          <div className="flex w-1/2 items-center pt-5">
            <p className="w-48">
              상품 공개: <span style={{ fontSize: '13px' }}>(선택)</span>
            </p>
            <Switch
              checked={displayProduct}
              onCheckedChange={handleDisplayProductChange}
            />
          </div>
          <div className="flex w-1/2 items-center pt-5">
            <p className="w-48">
              예약배송(프리오더):{' '}
              <span style={{ fontSize: '13px' }}>(선택)</span>
            </p>
            <Switch
              checked={preorder}
              onCheckedChange={handlePreorderProductChange}
            />
          </div>
          <div className="flex w-1/2 items-center pt-5">
            <p className={`w-48 ${isSoldout ? 'text-red-600' : ''}`}>
              품절: <span style={{ fontSize: '13px' }}>(선택)</span>
            </p>
            <Switch
              checked={isSoldout}
              onCheckedChange={handleSoldoutProductChange}
            />
          </div>

          <div className="flex w-full items-center pt-5">
            <p className="w-48">
              판매예약:{' '}
              <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
            </p>
            <RadioGroup
              defaultValue="sellnow"
              className="flex flex-row"
              onValueChange={handleProductSell}
            >
              <div className="flex w-32 items-center space-x-2">
                <RadioGroupItem value="sellnow" id="r1" />
                <Label htmlFor="r1">바로판매</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="selllater" id="r2" />
                <Label htmlFor="r2">판매 시작 설정</Label>
              </div>
            </RadioGroup>

            {date && <div className="ml-10 flex w-48">{date}시</div>}
          </div>
          {isDropProduct && (
            <div className="ml-48 mt-4 flex h-44">
              <DateTimePicker
                onChange={handleSellDate}
                value={date}
                format="y-MM-dd HH:mm"
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          )}

          <div className="flex">
            <div className="flex w-1/2 items-center pt-5">
              <p className="w-36">
                메인 카테고리:{' '}
                <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-2" variant="outline">
                    {selectedParentCategory ?
                      selectedParentCategory.name
                    : 'open'}
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
              <p className="w-36">
                상세 카테고리:{' '}
                <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-2" variant="outline">
                    {subCategory?.name || '선택'}
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
              <p className="mr-4 w-32">
                제품색:{' '}
                <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
              </p>
              <HexColorPicker
                color={color}
                onChange={handleColorHexInputChange}
              />
            </div>
            <div className="flex w-1/2 items-center pt-5">
              <p className="w-24">
                색명:{' '}
                <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
              </p>
              <Input
                type="text"
                placeholder="예) 빨강"
                value={productColor}
                onChange={handleColorInputChange}
                className="w-30"
              />
            </div>
          </div>

          {/* handle size input and remove size  */}

          <div className="flex flex-row pt-5">
            <p className="mt-5 w-44">
              사이즈:{' '}
              <span style={{ color: 'red', fontSize: '13px' }}>(필수)</span>
            </p>
            <div className="flex w-full flex-row">
              <div className="flex w-auto flex-col">
                {sizes?.map((size, index) => {
                  return (
                    <div key={size.id || index} className="mt-2 flex w-full">
                      <div className="flex w-48 pt-1">
                        <Input
                          type="text"
                          placeholder="예) Free"
                          onChange={(e) =>
                            setSizeValues((prevSizeValues) => {
                              const updatedSizeValues = [...prevSizeValues]
                              updatedSizeValues[index] = e.target.value
                              return updatedSizeValues
                            })
                          }
                          className="w-32"
                        />
                      </div>
                      <div className="flex w-72  pt-1">
                        <p className="mr-2 mt-2 w-36">
                          재고 수량:{' '}
                          <span style={{ color: 'red', fontSize: '13px' }}>
                            (필수)
                          </span>{' '}
                        </p>
                        <Input
                          type="number"
                          placeholder="예) 5000"
                          onChange={(e) =>
                            setStockValues((prevStockValues) => {
                              const updatedStockValues = [...prevStockValues]
                              updatedStockValues[index] = e.target.value
                              console.log(
                                'Updated Stock Values:',
                                updatedStockValues,
                              )
                              return updatedStockValues
                            })
                          }
                          className="w-32"
                        />
                        <p className="ml-2 mt-2">개</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className=" ml-16 items-center pt-3">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleAddSize()}
                >
                  +
                </Button>
                {sizes.length > 1 ?
                  <Button variant="outline" onClick={handleRemoveSize}>
                    -
                  </Button>
                : null}
              </div>
            </div>
          </div>

          {/* Option 1 Area */}
          <div className="flex flex-row pt-8">
            <p className="mt-5 w-32">
              {option1Title}: <span style={{ fontSize: '13px' }}>(선택)</span>
            </p>
            <div className="flex w-full flex-row">
              <div className="mr-16 pt-3">
                <Input
                  type="text"
                  placeholder="옵션제목(예, 발볼)"
                  onChange={handleOption1Change}
                  className="w-32"
                />
              </div>
              <div className="flex w-auto flex-col">
                {options1?.map((option, index) => (
                  <div key={option.id} className="mt-2 flex w-full">
                    <div className="flex w-72 pt-1">
                      <p className="mt-2 w-24">
                        옵션명: <span style={{ fontSize: '13px' }}>(선택)</span>{' '}
                      </p>
                      <Input
                        type="text"
                        placeholder="예) 발볼늘림 1단계"
                        // value={option.size}
                        onChange={(e) =>
                          setOption1Names((prevOptions) => {
                            const updatedOptions = [...prevOptions]
                            updatedOptions[index] = e.target.value
                            return updatedOptions
                          })
                        }
                        className="w-36"
                      />
                    </div>
                    <div className="flex w-72  pt-1">
                      <p className="ml-10 mt-2 w-24">
                        옵션: <span style={{ fontSize: '13px' }}>(선택)</span>{' '}
                      </p>
                      <Input
                        type="text"
                        placeholder="예, 20mm"
                        // value={option.stock}
                        onChange={(e) =>
                          setOption1Values((prevOptions) => {
                            const updatedOptions = [...prevOptions]
                            updatedOptions[index] = e.target.value
                            return updatedOptions
                          })
                        }
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-16 items-center pt-3">
                <Button variant="outline" className="mr-2" onClick={addOption1}>
                  +
                </Button>
                {options1.length > 1 ?
                  <Button variant="outline" onClick={removeOption1}>
                    -
                  </Button>
                : null}
              </div>
            </div>
          </div>

          {/* Option 2 Area */}
          <div className="flex flex-row pt-8">
            <p className="mt-5 w-32">
              {option2Title}: <span style={{ fontSize: '13px' }}>(선택)</span>
            </p>
            <div className="flex w-full flex-row">
              <div className="mr-16 pt-3">
                <Input
                  type="text"
                  placeholder="옵션제목(예, 둘레)"
                  onChange={handleOption2Change}
                  className="w-32"
                />
              </div>
              <div className="flex w-auto flex-col">
                {options2?.map((option, index) => (
                  <div key={option.id} className="mt-2 flex w-full">
                    <div className="flex w-72 pt-1">
                      <p className="mt-2 w-24">
                        옵션명: <span style={{ fontSize: '13px' }}>(선택)</span>{' '}
                      </p>
                      <Input
                        type="text"
                        placeholder="예) 둘레늘림 1단계"
                        onChange={(e) =>
                          setOption2Names((prevOptions) => {
                            const updatedOptions = [...prevOptions]
                            updatedOptions[index] = e.target.value
                            return updatedOptions
                          })
                        }
                        className="w-36"
                      />
                    </div>
                    <div className="flex w-72  pt-1">
                      <p className="ml-10 mt-2 w-24">
                        옵션: <span style={{ fontSize: '13px' }}>(선택)</span>{' '}
                      </p>
                      <Input
                        type="text"
                        placeholder="예, 20mm"
                        onChange={(e) =>
                          setOption2Values((prevOptions) => {
                            const updatedOptions = [...prevOptions]
                            updatedOptions[index] = e.target.value
                            return updatedOptions
                          })
                        }
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-16 items-center pt-3">
                <Button variant="outline" className="mr-2" onClick={addOption2}>
                  +
                </Button>
                {options2.length > 1 ?
                  <Button variant="outline" onClick={removeOption2}>
                    -
                  </Button>
                : null}
              </div>
            </div>
          </div>

          {/* Option 3 Area */}
          <div className="flex flex-row pt-8">
            <p className="mt-5 w-32">
              {option3Title}: <span style={{ fontSize: '13px' }}>(선택)</span>
            </p>
            <div className="flex w-full flex-row">
              <div className="mr-16 pt-3">
                <Input
                  type="text"
                  placeholder="옵션제목(예, 넓이)"
                  onChange={handleOption3Change}
                  className="w-32"
                />
              </div>
              <div className="flex w-auto flex-col">
                {options3?.map((option, index) => (
                  <div key={option.id} className="mt-2 flex w-full">
                    <div className="flex w-72 pt-1">
                      <p className="mt-2 w-24">
                        옵션명: <span style={{ fontSize: '13px' }}>(선택)</span>{' '}
                      </p>
                      <Input
                        type="text"
                        placeholder="예) 넓이늘림 1단계"
                        onChange={(e) =>
                          setOption3Names((prevOptions) => {
                            const updatedOptions = [...prevOptions]
                            updatedOptions[index] = e.target.value
                            return updatedOptions
                          })
                        }
                        className="w-36"
                      />
                    </div>
                    <div className="flex w-72  pt-1">
                      <p className="ml-10 mt-2 w-24">
                        옵션: <span style={{ fontSize: '13px' }}>(선택)</span>{' '}
                      </p>
                      <Input
                        type="text"
                        placeholder="예, 20mm"
                        onChange={(e) =>
                          setOption3Values((prevOptions) => {
                            const updatedOptions = [...prevOptions]
                            updatedOptions[index] = e.target.value
                            return updatedOptions
                          })
                        }
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-16 items-center pt-3">
                <Button variant="outline" className="mr-2" onClick={addOption3}>
                  +
                </Button>
                {options3.length > 1 ?
                  <Button variant="outline" onClick={removeOption3}>
                    -
                  </Button>
                : null}
              </div>
            </div>
          </div>

          <div className="mt-12 flex pb-80">
            <Button className="mt-8 w-60" onClick={handleSubmit}>
              저장
            </Button>
          </div>
        </div>
      }
    </>
  )
}

export default Page
