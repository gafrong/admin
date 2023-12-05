"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import useUserStore from "@/store/zustand";
import baseURL from '@/assets/common/baseUrl';
import awsURL from "@/assets/common/awsUrl";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Page() {
    const user = useUserStore((state) => state.user);
    const [ products, setProducts ] = useState([]);

    const vendorId = user?._id;

    const getVendorProduct = async () => {
        try {
            const response = await axios.get(`${baseURL}products/admin/${vendorId}`);

            setProducts(response.data);
        } catch (error ) {
            console.log('Product fetch error', error)
        }
    }
    useEffect(()=> {
        if(vendorId) {
            getVendorProduct()
        }
    }, [vendorId])

    const handleEditProduct = (product) => {
        console.log('checking handle edit product', product)
    }
    return (
        <div className="pl-5 pt-5">
            <h1>Product Edit Page</h1>
            <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]">Product</TableHead>
                            <TableHead className="w-[300px]">Title</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
            {products?.length > 0 && (
                products.map((product, index) => (
       
                    <TableBody key={index}>
                        <TableCell>
                            <img src={awsURL+product.image} alt={`Product ${index}`} className="w-12 h-12 rounded-sm" />
                        </TableCell>
                        <TableCell>
                            <div className="pl-5 mt-2">{product.name}</div>
                        </TableCell>
                        <TableCell>
                            <Link className="ml-5 p-4 pt-1 pb-1 border rounded-sm" onClick={()=>handleEditProduct(product)}>edit</Link>
                        </TableCell>
                    </TableBody>
              
                ))
            )}
              </Table>
        </div>
    );
}
