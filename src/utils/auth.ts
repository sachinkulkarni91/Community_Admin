// Utility functions for handling JWT authentication

export const getAuthToken = (): string | null => {
  // Check localStorage for JWT token
  const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('jwt');
  return token;
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('jwt');
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};
