import { getAuthCallbacks } from './getAuthCallbacks';
import { getAuthProviders } from './getAuthProviders';

import type { NextAuthOptions } from 'next-auth';

export const getAuthOptions = (): NextAuthOptions => ({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  providers: getAuthProviders(),
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: getAuthCallbacks(),
  secret: process.env.NEXTAUTH_SECRET,
});
