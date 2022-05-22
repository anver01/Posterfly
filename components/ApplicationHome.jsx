import React, { useState } from 'react'

function ApplicationHome ({ session }) {
  const [post, setPost] = useState('')

  const handlePost = () => {
    console.log({ post, author: session.user.name })
  }

  return (
    <div className='w-full my-4 h-screen'>
      <div className='flex flex-col w-1/2 m-auto border-x border-solid border-pf-black border-opacity-30 h-full'>
        <div className='flex flex-col items-center gap-5 my-2'>
          <textarea
            name="post"
            rows="10"
            className='w-10/12 h-20 p-2 text-lg'
            placeholder='What are you thinking...'
            value={post}
            onChange={e => setPost(e.target.value)}
          />
          <button className='px-6 py-2 bg-pf-lt-blue rounded-full' onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationHome
