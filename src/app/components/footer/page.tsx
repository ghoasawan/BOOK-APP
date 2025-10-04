import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='h-[100px]  z-10'>
        <div className=' h-full flex justify-center items-center '>
            <span className='border-r-1 border-gray-300 pr-[10px] hover:text-purple-500 text-gray-500'><Link href='/'>Home</Link></span>
            <span className='pl-[10px] hover:text-purple-500 text-gray-500'><Link href='/books'>Books</Link></span>
        </div>
    </div>
  )
}
