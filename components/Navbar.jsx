import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Navbar () {
  const [currentTab, setCurrentTab] = useState(1)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/') setCurrentTab(1)
    else setCurrentTab(2)
  }, [router])

  const getTabClass = (tab) => `${currentTab === tab ? 'border-pf-red' : 'border-pf-white'} border-b-4 border-solid rounded cursor-pointer`

  return (
    <div className='flex w-full justify-between py-6 px-20 items-center'>
      <Link href='/'>
        <span className='text-xl font-medium cursor-pointer'>
          Posterfly
        </span>
      </Link>
      {/* <Image height={200} width={200} src='/images/logo.svg' alt='Logo'/> */}
      <div className='flex items-center justify-between gap-10'>
        <Link href='/'>
          <span className={getTabClass(1)} onClick={() => setCurrentTab(1)}>The What</span>
        </Link>
        <Link href={'/how-we-do-it'}>
          <span className={getTabClass(2)} onClick={() => setCurrentTab(2)}>The How</span>
        </Link>
      </div>

      <div className='flex items-center justify-between gap-10'>
        <Link href='/login'>
          <button className='shadow-md px-8 py-3 rounded-full border border-solid border-pf-blue border-opacity-30'>
            LOG IN
          </button>
        </Link>
        <button className='primary-button px-8 py-3 shadow-md'>
          SIGN UP
        </button>
      </div>
    </div>
  )
}

export default Navbar
