import React, { useState, useMemo, useEffect } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton, Menu, MenuItem } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { USER_ACTIONS } from '../utility/constants'

function checkFavorite (activities, username) {
  return activities?.find(act => act.user === username)?.action === USER_ACTIONS.LIKE
}

function PostCard ({ postData, socket }) {
  const { data: session } = useSession()
  const [data, setData] = useState(postData)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)

  useEffect(() => {
    setData(postData)
  }, [postData])

  const favorite = useMemo(() => {
    return checkFavorite(data.UserActivities, session.username)
  }, [data])

  const likeCount = useMemo(() => {
    return data.UserActivities?.filter(activity => activity.action === 'like').length
  }, [data])

  socket.on('post-update', action => {
    if (action.postId === postData.id) {
      const activitiesTemp = postData.UserActivities || []
      if (!activitiesTemp.length) activitiesTemp.push(action)
      else {
        const activityToUpdate = activitiesTemp.findIndex(activity => activity.user === action.user)
        if (activityToUpdate < 0) activitiesTemp.push(action)
        else activitiesTemp.splice(activityToUpdate, 1, action)
      }
      setData({ ...postData, UserActivities: activitiesTemp })
    }
  })

  const handleLike = () => {
    axios.put('/api/posts/updatePost', {
      postId: postData.id,
      user: session.username,
      action: !favorite ? USER_ACTIONS.LIKE : USER_ACTIONS.UNLIKE
    })
      .then(res => {
        socket.emit('post-action', res.data)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='rounded-lg p-6 pb-3 max-w-md flex flex-col bg-pf-grite relative' style={{ minWidth: 500 }}>
      <span className='absolute top-1 right-2'>
        <IconButton size='small' onClick={(e) => setMenuAnchor(e.currentTarget)}>
          <MoreHorizIcon/>
        </IconButton>
      </span>
      <p className='text-pf-black mb-2'>{data.post}</p>
      <div className='flex items-center justify-between'>
        <span>
          <IconButton size='small' onClick={handleLike} style={{ position: 'relative', left: '-6px' }}>
            {favorite ? <FavoriteIcon style={{ width: '20px', height: '20px' }} /> : <FavoriteBorderIcon style={{ width: '20px', height: '20px' }} />}
          </IconButton>
          <span className='-ml-1'>{likeCount}</span>
        </span>
        <span className='text-pf-black text-opacity-50 ml-auto'>{data.author}</span>
      </div>
      <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={() => setMenuAnchor(null)}
          MenuListProps={{
            'aria-labelledby': 'more-menu'
          }}
        >
          <MenuItem
            onClick={() => {
              setMenuAnchor(null)
            }}
          >
            Report a problem
          </MenuItem>
        </Menu>
    </div>
  )
}

export default PostCard
