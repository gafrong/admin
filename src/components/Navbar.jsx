import awsURL from '@/assets/common/awsUrl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useUserStore from '@/store/zustand'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiBell, FiSettings } from 'react-icons/fi'

const Navbar = () => {
  const user = useUserStore((state) => state.user)
  const avatar = awsURL + user?.image

  return (
    <div className="h-15 fixed z-30 flex w-full justify-between border-b bg-white">
      <Link href="/">
        <Image
          src={
            'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/logo/voutiqblack.png'
          }
          width={80}
          height={50}
          className="mb-5 ml-5 mt-7"
          alt="logo"
        />
      </Link>
      <div className="mr-5 mt-5 flex flex-row">
        {user?.isAdmin ?
          <>
            <Link href="/profile">
              <Avatar className="mr-5 h-[30px] w-[30px]">
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>

            <Link href="#">
              <FiBell className="mr-5 mt-1" />
            </Link>
            <Link href="/setting">
              <FiSettings className="mt-1" />
            </Link>
          </>
          : <>
            {/* <Link href="/">
                            login
                        </Link> */}
          </>
        }
      </div>
    </div>
  )
}

export default Navbar
