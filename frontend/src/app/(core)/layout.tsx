'use client'

import { Navbar, Footer } from '@sections'
import React, { PropsWithChildren } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { MdOutlineCancel } from 'react-icons/md'

const SnackbarCloseButton = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <MdOutlineCancel
      onClick={() => closeSnackbar(snackbarKey)}
      color='white'
      size={20}
      className=' mr-2 cursor-pointer'
    />
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
      hideIconVariant={true}
    >
      <Navbar />
      <div className='min-h-[calc(100vh-299px)]'>{children}</div>
      <Footer />
    </SnackbarProvider>
  )
}

export default Layout
