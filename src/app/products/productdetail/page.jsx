"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import awsURL from "@/assets/common/awsUrl";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from "@/components/ui/switch"
import Image from 'next/image'

export default function Page({searchParams}) {
    const parsedProduct = JSON.parse(decodeURIComponent(searchParams.product));

    const [editedProduct, setEditedProduct] = useState({ ...parsedProduct });
    const [deliveryFeeOn, setDeliveryFeeOn] = useState(parsedProduct.deliveryFee);
    const [onSale, setOnSale] = useState(parsedProduct.onSale);
    const [displayProduct, setDisplayProduct] = useState(parsedProduct.display);
 
    const handleInputChange = (e, field) => {
        const inputValue = e.target.value;
        if (field === 'deliveryFeeAmount' && parseFloat(inputValue) > 0) {
            setDeliveryFeeOn(true);
        }

        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          [field]: e.target.value,
        }));
    };

    const handleFeeChange = () => {
        console.log('checking');
        const updatedSwitchValue = !deliveryFeeOn;
        setDeliveryFeeOn(updatedSwitchValue);
    
        // Update the corresponding property in editedProduct
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          deliveryFee: updatedSwitchValue,
          deliveryFeeAmount: updatedSwitchValue ? prevProduct.deliveryFeeAmount : 0,
        }));
    };

    const handleDiscountChange = () => {
        console.log('set discount')
        const updatedDiscountValue = !onSale;
        setOnSale(updatedDiscountValue);
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            onSale: updatedDiscountValue,
            discount: updatedDiscountValue ? prevProduct.discount : 0,
        }))
    }

    const handleDisplayProductChange = () => {
        console.log('show product')
        setDisplayProduct((prevValue) => !prevValue);
    }

    console.log('parsed PRODUCT', parsedProduct)
    return (
        <div className={`p-10 ${displayProduct ? '' : 'bg-gray-300'}`}>
            <img src={awsURL+editedProduct.image} alt={editedProduct.name} style={{opacity: displayProduct ? 1 : 0.5}}/>
            <div className="pt-5 flex">
                <p className='mr-2'>Name: </p> 
                <Input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className=""
                />
            </div>
            <div className="pt-5 flex">
                <p className='w-20'>제품 설명: </p> 
                <Textarea
                    type="text"
                    value={editedProduct.description}
                    onChange={(e) => handleInputChange(e, "description")}
                />
            </div>
   
            <div className="pt-5 flex w-1/3 items-center">
                <p className='w-16'>가격:</p> 
                <Input
                    type="text"
                    value={editedProduct.price}
                    onChange={(e) => handleInputChange(e, "price")}
                    className="w-32"
                />
                <p className='ml-2'>원</p>
            </div>
            <div className='flex'>
                <div className="pt-5 flex w-1/3 items-center">
                    <p className='w-24'>배송비 적용:</p>  
                    <Switch
                        checked={deliveryFeeOn}
                        onCheckedChange={handleFeeChange}
                    />
                </div>
                {deliveryFeeOn ?
                    <div className="pt-5 flex w-1/3 items-center">
                        <p className='w-16'>배송비:</p>    
                        <Input
                            type="text"
                            value={editedProduct.deliveryFeeAmount}
                            onChange={(e) => handleInputChange(e, "deliveryFeeAmount")}
                            className="w-24"
                        />
                        <p className='ml-2'>원</p>
                    </div> : null }
            </div>
            <div className='flex'>
                <div className="pt-5 flex w-1/3 items-center">
                    <p className='w-24'>할인률 적용:</p>  
                    <Switch
                        checked={onSale}
                        onCheckedChange={handleDiscountChange}
                    />
                </div>
                {onSale ?  
                    <div className="pt-5 flex w-1/3 items-center">
                        <p className='w-16'>할인률:</p>    
                        <Input
                            type="text"
                            value={editedProduct.discount}
                            onChange={(e) => handleInputChange(e, "discount")}
                            className="w-24"
                        />
                        <p className='ml-2'>%</p>
                    </div> : null}
            </div>
            <div className="pt-5 flex w-1/2 items-center">
                <p className='w-24'>상품 공개:</p>  
                <Switch
                    checked={displayProduct}
                    onCheckedChange={handleDisplayProductChange}
                />
            </div>
            {/* <div className="pt-5">
                <p>카테고리: {parsedProduct.category}</p>
                <p>드롭상품: {parsedProduct.dropProduct}</p>
                <p>할인판매: {parsedProduct.onSale}</p>
                <p>색옵션: {parsedProduct.colorOptions}</p>
                <p>옵션 1: {parsedProduct.subOption1}</p>
                <p>옵션 2: {parsedProduct.subOption2}</p>
                <p>옵션 3: {parsedProduct.subOption3}</p>
            </div> */}
        </div>
    );
}
