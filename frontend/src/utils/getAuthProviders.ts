import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { API_UNAVAILABLE_MESSAGE, API_UNAVAILABLE_STATUS_CODE } from './apiUrl';
import { fetchData } from './fetchData';

import type { NextAuthOptions, User } from 'next-auth';

type CredentialsAuthResponse = User & {
  access_token?: string;
  refresh_token?: string;
};

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

      const { data, error, statusCode } =
        await fetchData<CredentialsAuthResponse>('/sign-in', {
          method: 'POST',
          body: JSON.stringify(requestBody),
        });

      if ((statusCode === 200 || statusCode === 201) && data?.access_token) {
        return data;
      }

      if (statusCode === API_UNAVAILABLE_STATUS_CODE) {
        throw new Error(API_UNAVAILABLE_MESSAGE);
      }

      throw new Error(error?.message || 'Authentication failed');
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  }),
];
