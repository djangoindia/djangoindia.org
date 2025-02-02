import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expires_at?: number;
    id_token?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    id_token?: string;
  }

  interface User {
    access_token?: string;
    refresh_token?: string;
  }
}
