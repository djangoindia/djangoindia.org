import React from 'react'

import { TbProgress } from 'react-icons/tb'

const Loading = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <TbProgress className='animate-spin text-8xl' />
  </div>
)

export default Loading
