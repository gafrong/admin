import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FiSettings, FiBell } from "react-icons/fi";

const Navbar = () => {
    return (
        <div className='flex justify-between border-b'>
            <Link href="/">
                <Image 
                    src="https://voutiq-app.s3.ap-northeast-2.amazonaws.com/logo/voutiqblack.png"
                    width={80}
                    height={50}
                    className="mt-7 ml-5 mb-5"
                />
            </Link>
            <div className="flex flex-row mt-5 mr-5">
                <FiBell className="mr-5 mt-1"/>
                <FiSettings className="mt-1"/>
            </div>
        </div>
    )
}

export default Navbar