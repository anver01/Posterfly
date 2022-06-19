import React from 'react'

function Footer () {
  return (
    <div className='w-full bg-pf-blue'>
      <div className='w-11/12 m-auto text-pf-white flex justify-evenly py-10'>
        <div className='text-xl font-bold'>
          PosterFly
        </div>
        <div className='flex flex-col gap-4'>
          <span>The What</span>
          <span>The How</span>
        </div>
        <div className='flex flex-col'>
          <span>About Us</span>
        </div>
      </div>
      <hr className='w-11/12 m-auto border border-solid border-pf-white border-opacity-50' />
      <div className='text-pf-white text-center py-8'>
        <span className='text-sm'>© Copyrighted. All Rights Reserved.</span>
      </div>
    </div>
  )
}

export default Footer
