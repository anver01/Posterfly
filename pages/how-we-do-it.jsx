import React from 'react'

function How ({ gif }) {
  return (
    <div>
      <div className='grid w-full place-items-center my-20'>
        <img src={gif.images.original.url} alt='Gif' />
      </div>
    </div>
  )
}

export async function getServerSideProps () {
  const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`)
  const json = await response.json()
  return {
    props: { gif: json.data }
  }
}

export default How
