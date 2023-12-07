"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import awsURL from "@/assets/common/awsUrl";
export default function Page({searchParams}) {
    const router = useRouter();
    const data = router
    const product = searchParams;
    console.log('DATA', searchParams)
    return (
        <div className="p-10">
            <img src={awsURL+product.image} alt={product.name} />
            <div className="pt-5">
                <p>제품명: {product.name}</p>
                <p>설명: {product.description}</p>
                <p>가격: {product.price}</p>
                <p>배송비: {product.deliveryFeeAmount}</p>
                <p>배송비 적용: {product.deliveryFee}</p>
                <p>상세설명: {product.richDescription}</p>
                <p>카테고리: {product.category}</p>
                <p>드롭상품: {product.dropProduct}</p>
                <p>할인판매: {product.onSale}</p>
                <p>할인률: {product.discount}%</p>
                <p>판매중: {product.display}</p>
                <p>색옵션: {product.colorOptions}</p>
                <p>옵션 1: {product.subOption1}</p>
                <p>옵션 2: {product.subOption2}</p>
                <p>옵션 3: {product.subOption3}</p>
            </div>
        </div>
    );
}
