'use client'

import { Navbar, Footer } from '@sections'
import React, { PropsWithChildren } from 'react'
import {  SnackbarProvider } from 'notistack'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
    >
      <Navbar />
      <div className='min-h-[calc(100vh-299px)]'>{children}</div>
      <Footer />
    </SnackbarProvider>
  )
}

export default Layout
