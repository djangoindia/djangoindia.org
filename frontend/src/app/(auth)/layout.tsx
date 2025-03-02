import React, { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return <div className='flex h-screen w-screen'>{children}</div>;
};

export default Layout;
