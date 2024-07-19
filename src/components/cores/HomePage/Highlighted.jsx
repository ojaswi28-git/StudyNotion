import React from 'react'

const Highlighted = ({text}) => {
  return (
    <span className='text-transparent bg-clip-text bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>
      {text}
    </span>
  )
}

// <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."></div>

export default Highlighted