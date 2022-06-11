import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Onboarding () {
  const { data: session } = useSession()
  const [username, setUsername] = useState('')
  const router = useRouter()

  const saveUsername = async () => {
    axios.post('/api/setUsername', { username, email: session.user.email })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  if (session && session.username) router.push('/')

  return (
    <div>
      <div className='flex flex-col gap-4 w-1/4 shadow-md rounded-md m-auto my-10 p-10'>
        <h1>Please enter your username.</h1>
        <TextField
          label="Username"
          variant="outlined"
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='p-4 bg-pf-red rounded-md text-pf-white font-medium' onClick={saveUsername}>Save</button>
      </div>
    </div>
  )
}

export default Onboarding
