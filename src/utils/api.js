const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/products?${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.products || [];
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return await response.json();
};

export const fetchBanners = async () => {
  const response = await fetch(`${API_URL}/banners?active=true`);
  if (!response.ok) throw new Error('Failed to fetch banners');
  return await response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Registration failed');
  }
  return await response.json();
};

export const setPassword = async (token, password) => {
  const response = await fetch(`${API_URL}/auth/set-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to set password');
  }
  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Login failed');
  }
  return await response.json();
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to request password reset');
  }
  return await response.json();
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) return null;
  return await response.json();
};

export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create order');
  }
  return await response.json();
};

export const fetchMyOrders = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const response = await fetch(`${API_URL}/orders/my`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch orders');
  }
  const data = await response.json();
  return data.orders || [];
};

export const fetchOrderDetail = async (orderId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const response = await fetch(`${API_URL}/orders/my/${orderId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch order');
  }
  return await response.json();
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const response = await fetch(`${API_URL}/users/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(profileData)
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update profile');
  }
  return await response.json();
};

export const verifyEmail = async (token) => {
  const response = await fetch(`${API_URL}/auth/verify?token=${encodeURIComponent(token)}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Email verification failed');
  }
  return await response.json();
};

