'use client'

import React, { PropsWithChildren } from 'react'

import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack'
import { MdOutlineCancel } from 'react-icons/md'

import { Footer, Navbar } from '@sections'

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
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
      autoHideDuration={10000}
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
