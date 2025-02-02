import NextAuth from 'next-auth/next';

import { getAuthOptions } from '@/utils/getAuthOptions';

const handler = NextAuth(getAuthOptions());

export { handler as GET, handler as POST };
