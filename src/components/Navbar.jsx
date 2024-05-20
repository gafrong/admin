'use client'

import awsURL from '@/assets/common/awsUrl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePersistedStore } from '@/store/persisted-store'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiBell, FiSettings } from 'react-icons/fi'
import { Button } from './ui/button'

const Navbar = () => {
  console.log('Navbar')
  const { data: session, status } = useSession()
  const imageUrl = usePersistedStore((state) => state.imageUrl)
  const setImageUrl = usePersistedStore((state) => state.setImageUrl)
  const isLoading = status === 'loading'
  const user = session?.user

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/` })
  }

  React.useEffect(() => {
    const currentImage = session?.user?.image
    if (!currentImage) return
    const image = awsURL + currentImage
    // console.log('navbar currentImage', currentImage)
    setImageUrl(image)
  }, [session, setImageUrl])

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
                <AvatarImage src={imageUrl} />
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
