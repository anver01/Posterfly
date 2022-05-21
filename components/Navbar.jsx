import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem } from '@mui/material'

function Navbar () {
  const router = useRouter()
  const { data: session } = useSession()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)

  return (
    <div className='flex w-full justify-between py-6 px-20 items-center'>
      <Link href='/'>
        <span className='text-xl font-medium cursor-pointer'>
          Posterfly
        </span>
      </Link>
      {/* <Image height={200} width={200} src='/images/logo.svg' alt='Logo'/> */}

      <div className='flex items-center justify-between gap-10'>
        {session
          ? (
              <>
                <IconButton size='small' onClick={e => setMenuAnchor(e.currentTarget)}>
                  <AccountCircleIcon style={{ width: 40, height: 40 }}/>
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={menuOpen}
                  onClose={() => setMenuAnchor(null)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      signOut()
                      setMenuAnchor(null)
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )
          : router.pathname !== '/auth/login'
            ? (
          <>
            <button
              className='shadow-md px-8 py-3 rounded-full border border-solid border-pf-blue border-opacity-30'
              onClick={() => signIn()}
            >
              LOG IN
            </button>
            <button className='primary-button px-8 py-3 shadow-md'>
              SIGN UP
            </button>
          </>
              )
            : null}
      </div>
    </div>
  )
}

export default Navbar
