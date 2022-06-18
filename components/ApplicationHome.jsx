import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

function ApplicationHome ({ session }) {
  const [post, setPost] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/posts/getAllPosts', { params: { username: session.username } })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [session.username])

  const handlePost = () => {
    axios.post('/api/posts/createPost', { post, author: session.username })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div className='w-full my-4 h-screen'>
      <div className='flex flex-col w-1/2 m-auto border-x border-solid border-pf-black border-opacity-30 h-full'>
        <div className='flex flex-col items-center gap-5 my-2'>
          <textarea
            name="post"
            className='w-10/12 h-30 p-2 text-lg'
            placeholder='What are you thinking...'
            value={post}
            onChange={e => setPost(e.target.value)}
            style={{ resize: 'none' }}
          />
          <button className='px-6 py-2 bg-pf-lt-blue rounded-full' onClick={handlePost}>Post</button>
        </div>
        <hr className='mx-4 my-2 opacity-50'/>
        <div className='mx-auto my-2 flex flex-col gap-4'>
          {data.map((postData, index) => (
            <PostCard key={index} postData={postData} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApplicationHome
