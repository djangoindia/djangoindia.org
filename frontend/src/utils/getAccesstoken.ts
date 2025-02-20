'use server';

import { getServerSession } from 'next-auth';

import { decrypt } from './decrypt';
import { getAuthOptions } from './getAuthOptions';

/**
 * Retrieves the access token from the user session, decrypts it, and returns the result.
 *
 * @returns A promise that resolves with the decrypted access token or null if not available.
 *
 * @example Correct usage
 * ```ts
 * const accessToken = await getAccessToken();
 * ```
 * Result: 'decryptedAccessToken' (example output, assuming the access token is available in the user session)
 */
export const getAccessToken = async () => {
  const session = await getServerSession(getAuthOptions());

  return session &&
    'accessToken' in session &&
    typeof 'accessToken' === 'string'
    ? decrypt(session.accessToken ?? '')
    : null;
};
