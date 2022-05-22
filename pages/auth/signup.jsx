import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Blob1, Blob2, WaveLine } from '../../public/svg/Blobs'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function SignUp () {
  const [creds, setCreds] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/')
  }, [session])

  const handleInput = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    signIn('credentials', { ...creds })
  }

  return (
    <div className='w-full flex p-6 mt-4 mb-10 justify-center'>
      <div className='bg-gradient-to-tl from-pf-blue via-pf-indigo to-pf-lt-blue w-5/12 min-w-lg relative overflow-hidden py-28 rounded-l-md'>
        <h2 className='text-2xl font-semibold text-center my-6 text-pf-white'>Join in with your thoughts.</h2>
        <Blob1 className='w-72 absolute -top-24 -left-20 opacity-50' />
        <WaveLine className='absolute -top-8 -left-10 opacity-20 w-30 h-30' />
        <WaveLine className='absolute -top-8 -left-8 opacity-30 w-48 h-48' />
        <Blob2 className='w-72 absolute -bottom-28 -right-20 opacity-50' />
        <WaveLine className='absolute -bottom-12 -right-12 opacity-30 w-48 h-48' />
      </div>
      <div className='flex flex-col gap-4 p-8 border border-solid border-pf-black border-opacity-10 shadow-md rounded-r-md'>
        <h2 className='text-2xl font-semibold text-center'>Welcome to Posterfly!</h2>
        <hr className='w-2/3 m-auto my-2' />
        <button
          className='flex items-center gap-10 p-4 shadow-md w-full rounded-md border border-solid border-pf-black border-opacity-5'
          onClick={() => signIn('google')}
        >
          <img
            width="20px"
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Sign up with Google
        </button>
        <div className='flex items-center gap-2'>
          <hr className='w-2/3 m-auto my-4' />
          <span className='text-pf-black text-opacity-40'>or</span>
          <hr className='w-2/3 m-auto my-4' />
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            name='username'
            value={creds.username}
            onChange={handleInput}
          />
          <TextField
            label="Email"
            variant="outlined"
            name='email'
            value={creds.email}
            onChange={handleInput}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={creds.password}
            onChange={handleInput}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(prevState => !prevState)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }}
          />
          <button className='primary-button px-8 py-3 mt-12' type='submit'>
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
