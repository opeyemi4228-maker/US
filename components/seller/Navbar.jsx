import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image onClick={()=>router.push('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" />
      <button className='bg-neutral-950 text-white px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm uppercase tracking-[0.15em] hover:bg-orange-700 transition-colors'>Logout</button>
    </div>
  )
}

export default Navbar