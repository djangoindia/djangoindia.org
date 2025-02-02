import { encrypt } from './encrypt';

import type { NextAuthOptions } from 'next-auth';

export const getAuthCallbacks = (): NextAuthOptions['callbacks'] => ({
  jwt: ({ token, account }) => {
    if (account) {
      token.accessToken = account.access_token;
      token.expires_at = account.expires_at;
      token.id_token = account.id_token;
      token.refreshToken = account.refresh_token;
    }

    return token;
  },
  session: ({ session, token }) => {
    if (token.accessToken) {
      session.accessToken = encrypt(token.accessToken);
    }
    if (token.id_token) {
      session.id_token = encrypt(token.id_token);
    }
    if (token.refreshToken) {
      session.refreshToken = encrypt(token.refreshToken);
    }

    return session;
  },
  signIn: async ({ account, user }) => {
    // If provider is google
    if (account?.provider === 'google') {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/social-auth/`,
        {
          method: 'POST',
          body: JSON.stringify({
            clientId: process.env.GOOGLE_CLIENT_ID,
            credential: account.id_token,
            medium: 'google',
          }),
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const response = await res.json();

      account.refresh_token = response.refresh_token;
      account.access_token = response.access_token;
    }

    // If provider is credentials
    if (account?.provider === 'credentials') {
      account.refresh_token = user?.refresh_token;
      account.access_token = user?.access_token;
      user.image;
    }

    return true;
  },
});
