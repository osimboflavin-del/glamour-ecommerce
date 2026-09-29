const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const ASSET_BASE = BASE.replace(/\/api$/, '');
export const imgSrc = (url) => (url && url.startsWith('/uploads') ? ASSET_BASE + url : url);

let accessToken = localStorage.getItem('glamour_access_token') || null;

export function setAccessToken(token) {
  accessToken = token;
  if (token) localStorage.setItem('glamour_access_token', token);
  else localStorage.removeItem('glamour_access_token');
}
export function getAccessToken() {
  return accessToken;
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      credentials: 'include', // send/receive the httpOnly refresh-token cookie
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach the server. Start the backend (npm run dev in the backend folder) and try again.');
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || 'Request failed.');
  return data;
}

export const api = {
  signup: (payload) => request('/auth/signup', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me', { auth: true }),

  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (payload) => request('/products', { method: 'POST', body: payload, auth: true }),
  updateProduct: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: payload, auth: true }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE', auth: true }),

  checkout: (payload) => request('/orders', { method: 'POST', body: payload, auth: true }),
  myOrders: () => request('/orders/my', { auth: true }),
  allOrders: () => request('/orders', { auth: true }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PATCH', body: { status }, auth: true }),

  uploadImage: async (file) => {
    const fd = new FormData();
    fd.append('image', file);
    let res;
    try {
      res = await fetch(`${BASE}/uploads`, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` }, body: fd });
    } catch {
      throw new Error('Cannot reach the server.');
    }
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || 'Upload failed.');
    return data;
  },

  sendInquiry: (payload) => request('/inquiries', { method: 'POST', body: payload }),
  allInquiries: () => request('/inquiries', { auth: true }),
};
