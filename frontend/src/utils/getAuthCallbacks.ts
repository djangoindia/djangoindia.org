import { API_UNAVAILABLE_MESSAGE } from './apiUrl';
import { encrypt } from './encrypt';
import { fetchData } from './fetchData';

import type { NextAuthOptions } from 'next-auth';

type SocialAuthResponse = {
  access_token?: string;
  refresh_token?: string;
};

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
      if (!account.id_token) {
        console.error('Google sign-in failed: missing identity token.');
        return false;
      }

      const { data, error } = await fetchData<SocialAuthResponse>(
        '/social-auth',
        {
          method: 'POST',
          body: JSON.stringify({
            clientId: process.env.GOOGLE_CLIENT_ID,
            credential: account.id_token,
            medium: 'google',
          }),
        },
      );

      if (!data?.access_token || !data.refresh_token) {
        console.error(
          'Google sign-in failed:',
          error?.message ?? API_UNAVAILABLE_MESSAGE,
        );
        return false;
      }

      account.refresh_token = data.refresh_token;
      account.access_token = data.access_token;
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
