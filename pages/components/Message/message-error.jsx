import React from 'react'

export default function MessageError({message}) {
  return (
    <div className='text-sm font-thin text-red-500'>
        {message}
    </div>
  )
}
