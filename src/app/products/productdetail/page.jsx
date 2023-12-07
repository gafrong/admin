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
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.discount}</p>
            <p>{product.price}</p>
            <p>{product.richDescription}</p>
            <p>{product.name}</p>
        </div>
    );
}
