import React from 'react'
import { TbProgress } from 'react-icons/tb'

const Loading = () => (
  <div className='h-screen w-full flex items-center justify-center'>
    <TbProgress className='animate-spin text-8xl' />
  </div>
)

export default Loading
