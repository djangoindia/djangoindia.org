export function getApiUrl() {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.API_URL ?? 'http://localhost:8000/api/v1';
  } else {
    // Client-side
    return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
  }
}
