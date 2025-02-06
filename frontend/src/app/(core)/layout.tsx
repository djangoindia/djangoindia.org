import React, { type PropsWithChildren } from 'react';

import { Footer, Navbar } from '@sections';

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Navbar />
    <div className='min-h-[calc(100vh-299px)]'>{children}</div>
    <Footer />
  </>
);

export default Layout;
