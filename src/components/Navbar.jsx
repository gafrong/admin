import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FiSettings, FiBell } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
    return (
        <div className='flex justify-between border-b w-full h-15 fixed bg-white z-30'>
            <Link href="/">
                <Image 
                    src="https://voutiq-app.s3.ap-northeast-2.amazonaws.com/logo/voutiqblack.png"
                    width={80}
                    height={50}
                    className="mt-7 ml-5 mb-5"
                />
            </Link>
            <div className="flex flex-row mt-5 mr-5">
                <Link href="/profile">
                    <Avatar className="mr-5 w-[30px] h-[30px]">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <FiBell className="mr-5 mt-1"/>
                <Link href="/setting">
                    <FiSettings className="mt-1"/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar