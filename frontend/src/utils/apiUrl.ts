export function getApiUrl(): string {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.API_URL
  } else {
    // Client-side
    return process.env.NEXT_PUBLIC_API_URL
  }
}
