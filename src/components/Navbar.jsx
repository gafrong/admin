import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FiSettings, FiBell } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useUserStore from "@/store/zustand";
import awsURL from '@/assets/common/awsUrl'
const Navbar = () => {
    const user = useUserStore((state) => state.user);
    const avatar = awsURL + user?.image;

    return (
        <div className='flex justify-between border-b w-full h-15 fixed bg-white z-30'>
            <Link href="/">
                <Image 
                    src={"https://voutiq-app.s3.ap-northeast-2.amazonaws.com/logo/voutiqblack.png"}
                    width={80}
                    height={50}
                    className="mt-7 ml-5 mb-5"
                    alt="logo"
                />
            </Link>
            <div className="flex flex-row mt-5 mr-5">
                {user?.verified ? 
                    <>
                        <Link href="/profile">
                            <Avatar className="mr-5 w-[30px] h-[30px]">
                                <AvatarImage src={avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Link>

                        <Link href="#">
                            <FiBell className="mr-5 mt-1"/>
                        </Link>
                        <Link href="/setting">
                            <FiSettings className="mt-1"/>
                        </Link>
                    </>
                :  ( 
                    <>
                        {/* <Link href="/">
                            login
                        </Link> */}
                    </> 
                )}
            </div>
        </div>
    )
}

export default Navbar