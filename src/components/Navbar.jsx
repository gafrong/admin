'use client'

import awsURL from '@/assets/common/awsUrl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useUserStore from '@/store/zustand'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiBell, FiSettings } from 'react-icons/fi'
import { Button } from './ui/button'

const Navbar = () => {
  const { data: session, status } = useSession()
  const cacheBuster = useUserStore((state) => state.cacheBuster)
  const isLoading = status === 'loading'
  const user = session?.user

  const [avatar, setAvatar] = React.useState(null)
  // console.log( {image:user?.image})
  React.useEffect(() => {
    if (status !== 'loading' && user?.image) {
      setAvatar(`${awsURL}${user?.image}?${cacheBuster}`)
      console.log({ image: user?.image })
    }
  }, [cacheBuster, user?.image, status])

  React.useEffect(() => {
    console.log({ avatar })
  }, [avatar])

  React.useEffect(() => {
    const user = session?.user
    if (user?.image) {
      console.log('there is a user image')
      setAvatar(`${awsURL}${user.image}?${cacheBuster}`)
    }
  }, [session, session?.user?.image, cacheBuster])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/` })
  }

  return (
    <div className="fixed z-30 flex h-20 w-full items-center justify-between border-b border-t-transparent  bg-white py-4">
      <Link href="/" className="">
        <Image
          src={
            'https://voutiq-app.s3.ap-northeast-2.amazonaws.com/logo/voutiqblack.png'
          }
          alt="logo"
          className="ml-5"
          height="17"
          priority
          style={{ width: 'auto' }}
          width="80"
        />
      </Link>

      {user?.isAdmin && !isLoading && (
        <>
          <div className="mr-5 flex flex-row items-center gap-4">
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>

            <Link href="/profile">
              <Avatar className="h-[30px] w-[30px]">
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <Link href="#">
              <FiBell />
            </Link>
            <Link href="/setting">
              <FiSettings />
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
