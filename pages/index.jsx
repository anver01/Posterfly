import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import ApplicationHome from '../components/ApplicationHome'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

function Home () {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className='w-full h-screen absolute top-0 left-0 bg-pf-white z-50 grid place-items-center'>
        <CircularProgress/>
      </div>
    )
  }

  if (session && !session.username) router.push('/onboarding')

  if (session) return <ApplicationHome session={session} />

  return (
    <div>
      {/* Section 1 */}
      <div className='flex items-center w-full justify-center gap-20 my-12'>
        <div>
          <h3 className='text-pf-red font-semibold text-xl'>New Platform</h3>
          <h1 className='text-7xl font-bold mb-16'>
            Your Next<br/>
            Social Life.
          </h1>
          <h3 className='text-pf-black text-opacity-60 font-medium mb-8 text-lg'>Your new social media platform for<br/> all your thoughts in silence.</h3>
          <button className='shadow px-8 py-3 rounded-full bg-pf-red font-medium text-pf-white'>
            Get Started
          </button>
        </div>
        <div>
          <Image
            priority
            height={550}
            width={400}
            className='rounded-xl'
            src='/images/home-img.jpg'
            alt="Social Media"
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className='h-screen bg-pf-grite grid place-items-center'>
        <h1 className='text-5xl font-semibold'>Only You Know Your True Self.</h1>
        <div className='flex items-center gap-10'>
          <div className='bg-pf-white w-40 h-40 rounded-md grid place-items-center text-center shadow-md'>
            Completely Anonymous.
          </div>
          <div className='bg-pf-white w-40 h-40 rounded-md grid place-items-center text-center shadow-md'>
            <p>
              If you like it, you <span className='text-pf-red'>&lsquo;ting&rsquo;</span> it.
            </p>
          </div>
        </div>
        <h3 className='text-3xl'>We only give you the platform.</h3>
      </div>
    </div>
  )
}

export default Home
