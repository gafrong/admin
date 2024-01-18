'use client'

import awsURL from '@/assets/common/awsUrl'
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
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { CiCamera } from "react-icons/ci";
import styles from './productregister.module.css'
import mime from "mime";
import useUserStore from '@/store/zustand'

export default function Page() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state?.token);
  const userId = user?._id;

  const [mainImage, setMainImage] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);


  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [deliveryFeeOn, setDeliveryFeeOn] = useState('')
  const [onSale, setOnSale] = useState(false)
  const [soldout, setSoldout] = useState(false)
  const [displayProduct, setDisplayProduct] = useState(true)
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState('642d1f4406159dd4f0519464')
  const [color, setColor] = useState('')
  const [productColor, setProductColor] = useState('')

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

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleFirstImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setFirstImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSecondImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setSecondImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleThirdImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setThirdImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleFourthImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setFourthImage(reader.result)
      };
      reader.readAsDataURL(file);
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
      deliveryFeeAmount: updatedSwitchValue ? prevProduct.deliveryFeeAmount : 0,
    }))
  }

  const handleDiscountChange = () => {
    const updatedDiscountValue = !onSale
    setOnSale(updatedDiscountValue)
    setProduct((prevProduct) => ({
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
    setProduct((prevProduct) => ({
      ...prevProduct,
      soldout: updatedSoldout,
    }))
  }

  const handleColorInputChange = (e) => {
    setProductColor(e.target.value)
  }

  const handleColorHexInputChange = (e) => {
    setColor(e);
  }

  // Add Sizes and Remove Sizes options
  const [sizes, setSizes] = useState([{size: '', stock: ''}])
  const [colorOptions, setColorOptions] = useState({});

  const [ sizeValues, setSizeValues ] = useState([]);
  const [ stockValues, setStockValues ] = useState([]);

  const [ options1, setOptions1 ] = useState([]);
  const [ options2, setOptions2 ] = useState([]);
  const [ options3, setOptions3 ] = useState([]);
  const [ subOption1, setSubOption1 ] = useState({});
  const [ subOption2, setSubOption2 ] = useState({});
  const [ subOption3, setSubOption3 ] = useState({});

  const [ option1Title, setOption1Title] = useState('');
  const [ option2Title, setOption2Title] = useState('');
  const [ option3Title, setOption3Title] = useState('');

  const [ option1Names, setOption1Names ] = useState([]);
  const [ option2Names, setOption2Names ] = useState([]);
  const [ option3Names, setOption3Names ] = useState([]);
  const [ option1Values, setOption1Values] = useState([]);
  const [ option2Values, setOption2Values] = useState([]);
  const [ option3Values, setOption3Values] = useState([]);

  const handleAddSize = (size, stock) => {
    setSizes(prevSizes => {
        const updatedSizes = [...prevSizes];
        updatedSizes.push({ size, stock });
        return updatedSizes;
    });
    setSizeValues((prevSizeValues) => {
      const updatedSizeValues = [...prevSizeValues, size];
      return updatedSizeValues;
    });
  
    setStockValues((prevStockValues) => {
      const updatedStockValues = [...prevStockValues, stock];
      return updatedStockValues;
    });
  };

  const handleRemoveSize = () => {
      setSizes(prevSizes => {
          const updatedSizes = [...prevSizes];
          updatedSizes.pop(); // Remove the last added size
          return updatedSizes;
      });

      setSizeValues((prevSizeValues) => {
        const updatedSizeValues = [...prevSizeValues];
        updatedSizeValues.pop(); // Remove the last added size value
        return updatedSizeValues;
      });
    
      setStockValues((prevStockValues) => {
        const updatedStockValues = [...prevStockValues];
        updatedStockValues.pop(); // Remove the last added stock value
        return updatedStockValues;
      });
  };

  const addOption1 = () => {
    setOptions1(prevOptions => [
      ...prevOptions, { optionName: '', optionValue: ''}
    ]);
  }

  const removeOption1 = (index) => {
    setOptions1(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1); // Remove the last added size
      return updatedOptions;
    });
  }

  const addOption2 = () => {
    setOptions2(prevOptions => [
      ...prevOptions, { optionName: '', optionValue: ''}
    ]);
  }

  const removeOption2 = (index) => {
    setOptions2(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1); // Remove the last added size
      return updatedOptions;
    });
  }

  const addOption3 = () => {
    setOptions3(prevOptions => [
      ...prevOptions, { optionName: '', optionValue: ''}
    ]);
  }

  const removeOption3 = (index) => {
    setOptions3(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1); // Remove the last added size
      return updatedOptions;
    });
  }

  const handleSubmit = () => {
    console.log('PRODUCT', product)
    console.log('selectedParentCategory', selectedParentCategory);
    console.log('sub cate', subCategory)
    console.log('color name', productColor)
    console.log('color hex', color)
    console.log('size value', sizeValues)
    console.log('stock values', stockValues)
    console.log('colorOptions', colorOptions);
    console.log('subOption1', subOption1);
    if (
      product.name == "" ||
      product.price == "" ||
      product.description == "" ||
      product.selectedCategory == ""
    ) {
        setError("Please fill in the form correctly");
    }

    const formData = new FormData();
    const images = [mainImage, firstImage, secondImage, thirdImage, fourthImage];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img) {
          const newImageUri = "file:///" + img.split("file:/").join("");
          const imageFile = {
              uri: newImageUri,
              type: mime.getType(newImageUri),
              name: newImageUri.split("/").pop(),
          };
          formData.append("image", imageFile);
      }
    }

    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("parentCategory", selectedParentCategory);
    formData.append("category", subCategory);
    formData.append("richDescription", "richDescription example");
    formData.append("rating", product.rating);
    formData.append("numReviews", product.numReviews);
    formData.append("isFeatured", product.isFeatured);
    formData.append("colorOptions", JSON.stringify(colorOptions));
    formData.append("sale", product.onSale);
    formData.append("soldout", product.soldout);
    formData.append("display", displayProduct);
    formData.append("deliveryFee", product.deliveryFee);
    formData.append("deliveryCost", product.deliveryFeeAmount);
    formData.append("sellerId", userId);
    // formData.append("preorder", preorder);
    if (subOption1 !== "") {
      formData.append("subOption1", JSON.stringify(subOption1));

      if (subOption2 !== "") {
          formData.append("subOption2", JSON.stringify(subOption2));
      } else {
          formData.append("subOption2", null);
          formData.append("subOption3", null);
      }

      if (subOption3 !== "") {
          formData.append("subOption3", JSON.stringify(subOption3));
      } else {
          formData.append("subOption3", null);
      }
    } else {
        formData.append("subOption1", null);
        formData.append("subOption2", null);
        formData.append("subOption3", null);
    }
  }


  useEffect (() => {
    const selectedColorOptions = {
        productColor: productColor ? productColor : '',
        hexColor: color?  color : '',
        sizes: sizes.map((_, index) => ({
            size: sizeValues[index],
            stock: stockValues[index]
        })),
    }
    setColorOptions(selectedColorOptions);
  }, [sizeValues, stockValues, productColor, color, sizes])

  useEffect (() => {    
    const selectedOptions1 = {
        title: option1Title,
        options: options1.map((option, index) => ({
            name: option1Names[index],
            value: option1Values[index]
        })),
    }

    const hasOptionValues = option1Values.some((value)=> value !== '');

    if(hasOptionValues){
      setSubOption1(selectedOptions1)
    }
  }, [option1Names, option1Values])


  return (
    <div className={`p-10 ${displayProduct ? '' : 'bg-gray-300'}`}>
      <div className='flex'>      
        <div>
          {mainImage ?
            <div>
              <img src={mainImage} alt="main image" style={{ opacity: displayProduct ? 1 : 0.5, width: '250px', height: '250px', objectFit: 'cover' }} />
              <label htmlFor="mainImageInput" className={styles.mainLabel}>
                <CiCamera className={styles.mainImageCamera}/>
              </label>
              <input type="file" accept="image/*" id="mainImageInput" style={{display:'none'}} onChange={handleMainImageChange}/>   
            </div>
          : <div className={styles.mainImageBlank}>
              <label htmlFor="mainImageInput" className={styles.mainLabelStart}>
                제품 이미지 <CiCamera className={styles.cameraCenter}/>
              </label>
              <input type="file" accept="image/*" id="mainImageInput" style={{display:'none'}} onChange={handleMainImageChange}/>   
            </div>
          }
        </div>
        <div className={styles.productImageContainer}>
          { mainImage && (
            <>
              {firstImage ? (
                <div className={styles.productImageShow}>
                  <img src={firstImage} alt="first image" style={{ opacity: displayProduct ? 1 : 0.5, width: '150px', height: '150px', objectFit: 'cover' }}/>
                  <label htmlFor="firstImageInput" className={styles.firstLabel}>
                    <CiCamera className={styles.firstImageCamera}/>
                  </label>
                  <input type="file" accept="image/*" id="firstImageInput" style={{display:'none'}} onChange={handleFirstImageChange}/>  
                </div>
              ) : (
                <div className={styles.productImage}>
                  <label htmlFor="firstImageInput" className={styles.labelFirst}>
                    <CiCamera className={styles.smallCameraCenter}/>
                  </label>
                  <input type="file" accept="image/*" id="firstImageInput" style={{display:'none'}} onChange={handleFirstImageChange}/>  
                </div>
              )}
            </>
          )}

          { mainImage && firstImage && (
            <>
              {secondImage ? (
                <div className={styles.productImageShow}>
                  <img src={secondImage} alt="second image" style={{ opacity: displayProduct ? 1 : 0.5, width: '150px', height: '150px', objectFit: 'cover' }}/>
                  <label htmlFor="secondImageInput" className={styles.firstLabel}>
                    <CiCamera className={styles.firstImageCamera}/>
                  </label>
                  <input type="file" accept="image/*" id="secondImageInput" style={{display:'none'}} onChange={handleSecondImageChange}/> 
                </div>
              ) : (
                <div className={styles.productImage}>
                  <label htmlFor="secondImageInput" className={styles.labelFirst}>
                    <CiCamera className={styles.smallCameraCenter}/>
                  </label>
                  <input type="file" accept="image/*" id="secondImageInput" style={{display:'none'}} onChange={handleSecondImageChange}/>  
                </div>
              )}
            </>
          )}

          { mainImage && firstImage && secondImage && (
            <>
              {thirdImage ? (
                <div className={styles.productImageShow}>
                  <img src={thirdImage} alt="third image" style={{ opacity: displayProduct ? 1 : 0.5, width: '150px', height: '150px', objectFit: 'cover' }}/>
                  <label htmlFor="thirdImageInput" className={styles.firstLabel}>
                    <CiCamera className={styles.firstImageCamera}/>
                  </label>
                  <input type="file" accept="image/*" id="thirdImageInput" style={{display:'none'}} onChange={handleThirdImageChange}/> 
                </div>
              ) : (
                <div className={styles.productImage}>
                  <label htmlFor="thirdImageInput" className={styles.labelFirst}>
                    <CiCamera className={styles.smallCameraCenter}/>
                  </label>
                  <input type="file" accept="image/*" id="thirdImageInput" style={{display:'none'}} onChange={handleThirdImageChange}/>  
                </div>
              )}
            </>
          )}

          { mainImage && firstImage && secondImage && thirdImage && (
            <>
              {fourthImage ? (
                <div className={styles.productImageShow}>
                  <img src={fourthImage} alt="fourth image" style={{ opacity: displayProduct ? 1 : 0.5, width: '150px', height: '150px', objectFit: 'cover' }}/>
                  <label htmlFor="fourthImageInput" className={styles.firstLabel}>
                    <CiCamera className={styles.firstImageCamera}/>
                  </label>
                  <input type="file" accept="image/*" id="fourthImageInput" style={{display:'none'}} onChange={handleFourthImageChange}/> 
                </div>
              ) : (
                <div className={styles.productImage}>
                  <label htmlFor="fourthImageInput" className={styles.labelFirst}>
                    <CiCamera className={styles.smallCameraCenter}/>
                  </label>
                  <input type="file" accept="image/*" id="fourthImageInput" style={{display:'none'}} onChange={handleFourthImageChange}/>  
                </div>
              )}
            </>
          )}

        </div>
      </div>

      <div className="flex pt-5">
        <p className="w-36">제품명: <span style={{color: 'red', fontSize: '13px'}}>(필수)</span></p>
        <Input
          type="text"
          placeholder="예) 슬림 반팔 티셔츠"
          value={product.name}
          onChange={(e) => handleInputChange(e, 'name')}
          className=""
        />
      </div>
      <div className="flex pt-5">
        <p className="w-36">제품 설명: <span style={{color: 'red', fontSize: '13px'}}>(필수)</span></p>
        <Textarea
          type="text"
          placeholder="예) 절개 없이 드레이프 되는 세련된 넥라인과 캡소매 디자인으로 여성스럽고 도시적인 느낌의 티셔츠입니다."
          value={product.description}
          rows={10}
          onChange={(e) => handleInputChange(e, 'description')}
        />
      </div>

      <div className="flex w-1/3 items-center pt-5">
        <p className="w-32">가격: <span style={{color: 'red', fontSize: '13px'}}>(필수)</span></p>
        <Input
          type="number"
          placeholder="예) 50000"
          value={product?.price?.toLocaleString()}
          onChange={(e) => handleInputChange(e, 'price')}
          className="w-32"
        />
        <p className="ml-2">원</p>
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-36">배송비 적용: <span style={{fontSize: '13px'}}>(선택)</span></p>
          <Switch checked={deliveryFeeOn} onCheckedChange={handleFeeChange} />
        </div>
        {deliveryFeeOn ?
          <div className="flex w-1/2 items-center pt-5">
            <p className="w-28">배송비: <span style={{color: 'red', fontSize: '13px'}}>(필수)</span></p>
            <Input
              type="number"
              value={product.deliveryFeeAmount}
              onChange={(e) => handleInputChange(e, 'deliveryFeeAmount')}
              className="w-24"
            />
            <p className="ml-2">원</p>
          </div>
        : null}
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-36">할인률 적용: <span style={{fontSize: '13px'}}>(선택)</span></p>
          <Switch checked={onSale} onCheckedChange={handleDiscountChange} />
        </div>
        {onSale ?
          <div className="flex w-1/2 items-center pt-5">
            <p className="w-28">할인률: <span style={{color: 'red', fontSize: '13px'}}>(필수)</span></p>
            <Input
              type="number"
              value={product.discount}
              onChange={(e) => handleInputChange(e, 'discount')}
              className="w-24"
            />
            <p className="ml-2">%</p>
          </div>
        : null}
      </div>
      <div className="flex w-1/2 items-center pt-5">
        <p className="w-36">상품 공개: <span style={{fontSize: '13px'}}>(선택)</span></p>
        <Switch
          checked={displayProduct}
          onCheckedChange={handleDisplayProductChange}
        />
      </div>
      <div className="flex w-1/2 items-center pt-5">
        <p className={`w-36 ${soldout ? 'text-red-600' : ''}`}>품절: <span style={{fontSize: '13px'}}>(선택)</span></p>
        <Switch
          checked={soldout}
          onCheckedChange={handleSoldoutProductChange}
        />
      </div>
      <div className="flex">
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-36">메인 카테고리: <span style={{color: 'red',fontSize: '13px'}}>(필수)</span></p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-2" variant="outline">
                {selectedParentCategory ? selectedParentCategory.name : 'open'}
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
          <p className="w-36">상세 카테고리: <span style={{color: 'red',fontSize: '13px'}}>(필수)</span></p>
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
          <p className="mr-4 w-32">제품색: <span style={{color: 'red',fontSize: '13px'}}>(필수)</span></p>
          <HexColorPicker color={color} onChange={handleColorHexInputChange} />
        </div>
        <div className="flex w-1/2 items-center pt-5">
          <p className="w-24">색명: <span style={{color: 'red',fontSize: '13px'}}>(필수)</span></p>
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
        <p className="w-44 mt-5">사이즈: <span style={{color: 'red',fontSize: '13px'}}>(필수)</span></p>
        <div className="flex flex-row w-full">
   
          <div className='flex flex-col w-auto'>
            {sizes?.map((size, index) => {
              return(
                <div key={size.id} className="flex mt-2 w-full">
                  <div className="flex w-48 pt-1"> 
                    <Input
                      type="text"
                      placeholder="예) Small"
                      onChange={(e)=> setSizeValues(prevSizeValues => {
                        const updatedSizeValues = [...prevSizeValues];
                        updatedSizeValues[index] = e.target.value;
                        return updatedSizeValues;
                      })}
                      className="w-32"
                    />
                  </div>
                  <div className="flex w-72  pt-1">  
                    <p className="mr-2 mt-2 w-36">재고 수량: <span style={{color: 'red',fontSize: '13px'}}>(필수)</span> </p>
                    <Input
                      type="number"
                      placeholder='예) 5000'
                      onChange={(e) => setStockValues((prevStockValues) => {
                          const updatedStockValues = [...prevStockValues,];
                          updatedStockValues[index] = e.target.value;
                          console.log('Updated Stock Values:', updatedStockValues);
                          return updatedStockValues;
                      })}
                      className="w-32"
                    />
                    <p className="ml-2 mt-2">개</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className=' items-center pt-3 ml-16'>
            <Button variant="outline" className="mr-2" onClick={()=>handleAddSize()}>+</Button>
            <Button variant="outline" onClick={handleRemoveSize}>-</Button>
          </div>  
        </div> 
      </div>

      {/* Option 1 Area */}
      <div className="flex flex-row pt-8">
        <p className="w-44 mt-5">옵션 1 설정: <span style={{fontSize: '13px'}}>(선택)</span></p>
        <div className="flex flex-row w-full">

          <div className="flex flex-col w-auto">
            {options1?.map((option, index) => (
              <div key={option.id} className="flex mt-2 w-full">
                <div className="flex w-48 pt-1"> 
                  <Input
                    type="text"
                    placeholder='옵션명 (예, 둘레)'
                    // value={option.size}
                    onChange={(e)=> 
                      setOption1Names((prevOptions) => {
                          const updatedOptions = [...prevOptions];
                          updatedOptions[index] = e.target.value;
                          return updatedOptions;
                    })}
                    className="w-32"
                  />
                </div>
                <div className="flex w-72  pt-1">  
                <p className="mt-2 w-36">옵션: <span style={{fontSize: '13px'}}>(선택)</span> </p>
                  <Input
                    type="text"
                    placeholder='예, 20mm'
                    // value={option.stock}
                    onChange={(e) => 
                      setOption1Values((prevOptions) => {
                          const updatedOptions = [...prevOptions];
                          updatedOptions[index] = e.target.value;
                          return updatedOptions;
                      })
                  }
                    className="w-32"
                  />
                </div>
              </div>
            ))}
          </div>  
          <div className='items-center pt-3 ml-16'>
            <Button variant="outline" className="mr-2" onClick={addOption1}>+</Button>
            <Button variant="outline" onClick={removeOption1}>-</Button>
          </div> 
        </div>
      </div> 

      {/* Option 2 Area */}
      <div className="flex flex-row pt-8">
        <p className="w-44 mt-5">옵션 2 설정: <span style={{fontSize: '13px'}}>(선택)</span></p>
        <div className="flex flex-row w-full">

          <div className="flex flex-col w-auto">
            {options2?.map((option, index) => (
              <div key={option.id} className="flex mt-2 w-full">
                <div className="flex w-48 pt-1"> 
                  <Input
                    type="text"
                    placeholder='옵션명 (예, 둘레)'
                    onChange={(e)=> 
                      setOption2Names((prevOptions) => {
                          const updatedOptions = [...prevOptions];
                          updatedOptions[index] = e.target.value;
                          return updatedOptions;
                    })}
                    className="w-32"
                  />
                </div>
                <div className="flex w-72  pt-1">  
                <p className="mt-2 w-36">옵션: <span style={{fontSize: '13px'}}>(선택)</span> </p>
                  <Input
                    type="text"
                    placeholder='예, 20mm'
                    onChange={(e) => 
                      setOption2Values((prevOptions) => {
                          const updatedOptions = [...prevOptions];
                          updatedOptions[index] = e.target.value;
                          return updatedOptions;
                      })
                  }
                    className="w-32"
                  />
                </div>
              </div>
            ))}
          </div>  
          <div className='items-center pt-3 ml-16'>
            <Button variant="outline" className="mr-2" onClick={addOption2}>+</Button>
            <Button variant="outline" onClick={removeOption2}>-</Button>
          </div> 
        </div>
      </div> 

      {/* Option 3 Area */}
      <div className="flex flex-row pt-8">
        <p className="w-44 mt-5">옵션 3 설정: <span style={{fontSize: '13px'}}>(선택)</span></p>
        <div className="flex flex-row w-full">

          <div className="flex flex-col w-auto">
            {options3?.map((option, index) => (
              <div key={option.id} className="flex mt-2 w-full">
                <div className="flex w-48 pt-1"> 
                  <Input
                    type="text"
                    placeholder='옵션명 (예, 둘레)'
                    onChange={(e)=> 
                      setOption3Names((prevOptions) => {
                          const updatedOptions = [...prevOptions];
                          updatedOptions[index] = e.target.value;
                          return updatedOptions;
                    })}
                    className="w-32"
                  />
                </div>
                <div className="flex w-72  pt-1">  
                <p className="mt-2 w-36">옵션: <span style={{fontSize: '13px'}}>(선택)</span> </p>
                  <Input
                    type="text"
                    placeholder='예, 20mm'
                    onChange={(e) => 
                      setOption3Values((prevOptions) => {
                          const updatedOptions = [...prevOptions];
                          updatedOptions[index] = e.target.value;
                          return updatedOptions;
                      })
                  }
                    className="w-32"
                  />
                </div>
              </div>
            ))}
          </div>  
          <div className='items-center pt-3 ml-16'>
            <Button variant="outline" className="mr-2" onClick={addOption3}>+</Button>
            <Button variant="outline" onClick={removeOption3}>-</Button>
          </div> 
        </div>
      </div> 

      <div className="mt-12 flex pb-80">
        <Button className="mt-8 w-60" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  )
}
