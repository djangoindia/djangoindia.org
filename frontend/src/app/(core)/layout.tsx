import { Navbar, Footer } from '@sections'
import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-299px)]'>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
