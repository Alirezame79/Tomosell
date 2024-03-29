'use client'
import profile from '../public/assets/profile.jpg'
import Image from 'next/image'
import Button from './ui/Button'
import './../style/style.css'
import Link from 'next/link'
import { useEffect, useContext } from 'react'
import ProfileContext from '@/context/profileContext'
import { useRouter } from 'next/navigation'

export default function Header () {
  const {authentication, setAuthentication} = useContext(ProfileContext);
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("authentication") === '1') {
      setAuthentication(1);
    }
  }, [])

  function logOutClicked() {
    setAuthentication(0)
    localStorage.setItem("authentication", 0);
    router.push('/')
  }

  return (
    <div className="bg-orange-100 h-10 sm:h-11 md:h-12 lg:h-12 shadow-md flex justify-between items-center p-3">
      <h1 className='text-lg md:text-xl lg:text-2xl ml-5 app_title cursor-pointer'><Link href='/'>Tomosell</Link></h1>

      {authentication === 1 ?
      <div className='relative dropdown_account_opener'>
        <Image 
          className='rounded-full mr-3 cursor-pointer'
          src={profile}
          width={40}
          alt='user Loged-in'
          />

        <div className='dropdown_account_menu p-1.5 -ml-28 md:-ml-36 w-40 md:w-48 bg-orange-50 rounded-lg gap-2'>
          <Link className='p-2 rounded hover:bg-orange-100 cursor-pointer block text-sm md:text-base' href='/account'>My Account</Link>
          <Link className='p-2 rounded hover:bg-orange-100 cursor-pointer block text-sm md:text-base' href='/addproduct'>Add New Product</Link>
          <Link className='p-2 rounded hover:bg-orange-100 cursor-pointer block text-sm md:text-base' href='/favorite'>Favorite</Link>
          <Button className='mt-4 mb-1.5 mx-3 md:mx-5 bg-white w-4/5 text-sm md:text-base' onClick={logOutClicked} type='secondary'>Sign Out</Button>
        </div>
      </div> :

      <Button className='text-xs sm:text-xs md:text-sm lg:text-sm mr-3' type='primary'><Link href='/signin'>SignUp / SignIn</Link></Button> }
    </div>
  )
}