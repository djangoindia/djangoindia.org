'use client';

import type { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';
import { type SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { MdOutlineCancel } from 'react-icons/md';

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <MdOutlineCancel
      onClick={() => closeSnackbar(snackbarKey)}
      color='white'
      size={20}
      className=' mr-2 cursor-pointer'
    />
  );
};

/**
 * It handles combining all of the providers required for a Next.js application
 * @note It is used for wrapping the top level layout of the Next.js application
 */
export const Providers = ({ children }: PropsWithChildren) => (
  <SessionProvider>
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
      {children}
    </SnackbarProvider>
  </SessionProvider>
);
