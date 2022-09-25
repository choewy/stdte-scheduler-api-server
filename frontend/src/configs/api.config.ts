export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: Object.fromEntries(
    (process.env.REACT_APP_API_HEADERS || '')
      .split(', ')
      .map((header) => [header, header]),
  ),
  credentials: process.env.REACT_APP_API_CREDENTIALS === 'true',
};
