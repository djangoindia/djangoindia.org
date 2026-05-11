import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { NextAuthOptions } from 'next-auth';
import { getApiUrl } from './apiUrl';

export const getAuthProviders = (): NextAuthOptions['providers'] => [
  CredentialProvider({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      const requestBody = {
        email: credentials?.email,
        password: credentials?.password,
      };
      const res = await fetch(`${getApiUrl()}/sign-in/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });
      const resdata = await res.json();

      if (
        res.status === 400 ||
        res.status === 401 ||
        res.status === 403 ||
        res.status === 500
      ) {
        throw new Error(resdata.message || 'Authentication failed');
      }
      if (res.status === 200 || res.status === 201) {
        return resdata;
      }
      // Return null if user data could not be retrieved
      return null;
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  }),
];
