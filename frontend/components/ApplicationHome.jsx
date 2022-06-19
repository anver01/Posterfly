import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'

function ApplicationHome ({ session, socket }) {
  const [post, setPost] = useState('')
  const [data, setData] = useState([])
  const scrollRef = useRef(null)

  socket.on('update', updatedData => {
    console.log([updatedData, ...data])
    setData([updatedData, ...data])
  })

  useEffect(() => {
    axios.get('/api/posts/getAllPosts', { params: { offset: 0 } })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const handlePost = () => {
    if (!post) return
    axios.post('/api/posts/createPost', { post, author: session.username })
      .then(res => socket.emit('create-post', res.data))
      .catch(err => console.log(err))
      .finally(() => {
        setPost('')
      })
  }

  return (
    <div className='w-full my-4 min-h-screen'>
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
        <div className='mx-auto my-2 flex flex-col gap-4' ref={scrollRef}>
          {!data.length
            ? (
                <div className='mt-20'>
                  <CircularProgress />
                </div>
              )
            : data.map((postData, index) => (
                <PostCard key={index} postData={postData} socket={socket} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ApplicationHome
