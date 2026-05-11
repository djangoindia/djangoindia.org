export const API_UNAVAILABLE_STATUS_CODE = 503;
export const API_UNAVAILABLE_MESSAGE =
  'This is temporarily unavailable due to some reason. It will be available soon.';
export const API_TIMEOUT_MESSAGE =
  'This is temporarily unavailable due to some reason. It will be available soon.';

const DEFAULT_API_REQUEST_TIMEOUT_MS = 5000;

const normalizeApiUrl = (url?: string) => {
  const trimmedUrl = url?.trim();

  if (!trimmedUrl) {
    return null;
  }

  return trimmedUrl.replace(/\/+$/, '');
};

export function getApiUrl() {
  if (typeof window === 'undefined') {
    return (
      normalizeApiUrl(process.env.API_URL) ??
      normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL)
    );
  }

  return normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);
}

export function buildApiUrl(path: string) {
  const apiUrl = getApiUrl();

  if (!apiUrl) {
    return null;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${apiUrl}${normalizedPath}`;
}

export function getApiRequestTimeoutMs() {
  const timeout = Number.parseInt(
    process.env.NEXT_PUBLIC_API_REQUEST_TIMEOUT_MS ?? '',
    10,
  );

  return Number.isFinite(timeout) && timeout > 0
    ? timeout
    : DEFAULT_API_REQUEST_TIMEOUT_MS;
}
