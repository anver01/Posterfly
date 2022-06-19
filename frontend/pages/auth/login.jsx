import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Blob1, Blob2, WaveLine } from '../../public/svg/Blobs'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { getPosts } from '../../utility/getPosts'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Login ({ posts }) {
  const [creds, setCreds] = useState({
    email: '',
    password: ''
    // rememberMe: true
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/onboarding')
  }, [session])

  const handleInput = (e) => {
    if (e.target.name === 'rememberMe') {
      setCreds({
        ...creds,
        [e.target.name]: e.target.checked
      })
    } else {
      setCreds({
        ...creds,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await signIn('credentials', { ...creds, redirect: false })
    if (!response.ok) setError('Email/Username not found. Please sign up.')
    if (response.ok && response.error) setError('Email/Password is incorrect. Please try again.')
  }

  return (
    <div className='w-full flex p-6 mt-4 mb-10 justify-center'>
      <div className='bg-gradient-to-tl from-pf-blue via-pf-indigo to-pf-lt-blue w-5/12 min-w-lg relative overflow-hidden py-28 rounded-l-md'>
        <h2 className='text-2xl font-semibold text-center my-6 text-pf-white'>Join in with your thoughts.</h2>
        <div className='flex flex-col items-center gap-3'>
          {/* Card 1 */}
          {/* <div className='rounded-lg p-6 max-w-sm flex flex-col bg-login-card-1 relative left-10'>
            <p className='text-[#FCBF49]'>I wonder if there are people who think they can look at the sun.</p>
            <span className='text-pf-white text-opacity-60 ml-auto'>Sk8terBoi</span>
          </div> */}
          {/* Card 2 */}
          {/* <div className='rounded-lg p-6 max-w-sm flex flex-col bg-login-card-2 relative right-10'>
            <p className='text-pf-white'>I have been putting extra salt in nuggets to my customers.</p>
            <span className='text-[#42e0f5] text-opacity-60 ml-auto'>BlauStois3</span>
          </div> */}
          {posts.map((post, index) => (
            <div key={index} className={`rounded-lg p-6 max-w-sm flex flex-col bg-pf-grite relative ${index % 2 ? 'right-10' : 'left-10'}`}>
              <p className='text-pf-black'>{post.post}</p>
              <span className='text-pf-black text-opacity-60 ml-auto'>{post.author}</span>
            </div>
          ))}
        </div>
        <Blob1 className='w-72 absolute -top-24 -left-20 opacity-50' />
        <WaveLine className='absolute -top-8 -left-10 opacity-20 w-30 h-30' />
        <WaveLine className='absolute -top-8 -left-8 opacity-30 w-48 h-48' />
        <Blob2 className='w-72 absolute -bottom-28 -right-20 opacity-50' />
        <WaveLine className='absolute -bottom-12 -right-12 opacity-30 w-48 h-48' />
      </div>
      <div className='flex flex-col gap-4 p-8 border border-solid border-pf-black border-opacity-10 shadow-md rounded-r-md'>
        <h2 className='text-2xl font-semibold text-center'>Login to Posterfly</h2>
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
          Sign in with Google
        </button>
        <div className='flex items-center gap-2'>
          <hr className='w-2/3 m-auto my-4' />
          <span className='text-pf-black text-opacity-40'>or</span>
          <hr className='w-2/3 m-auto my-4' />
        </div>
        <span className='text-pf-red opacity-60 text-sm my-1 relative -top-2'>
          {error}
        </span>
        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
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
          <div className='flex items-center justify-between gap-8 select-none'>
            {/* <span className='flex items-center gap-1'>
              <input type="checkbox" name="rememberMe" id="rememberMe" checked={creds.rememberMe} onChange={handleInput} />
              <label htmlFor="rememberMe" className='text-sm'>Remember Me</label>
            </span> */}
            <span className='text-sm text-pf-indigo'>
              Forgot Password?
            </span>
          </div>
          <button className='primary-button px-8 py-3 mt-12' type='submit'>
            LOGIN
          </button>
        </form>
        <span className='text-sm text-center'>Do not have an account? <span className='text-pf-link-blue font-medium'><Link href='/auth/signup'>Sign Up</Link></span></span>
      </div>
    </div>
  )
}

export async function getStaticProps () {
  const posts = await getPosts()
  return {
    props: { posts }
  }
}

export default Login
