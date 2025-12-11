export const API_BASE = process.env.REACT_APP_API_BASE;

// 401 응답 처리 콜백
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedCallback(callback: () => void) {
  onUnauthorized = callback;
}

async function handleResponse(res: Response) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    if (onUnauthorized) onUnauthorized();
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `HTTP Error: ${res.status}`);
  }
  return res.json();
}

export async function loginRequest(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
}

export async function fetchProfile(token: string) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// 새로 추가: 결제 요청 (GET /payment/?productId=...&quantity=...)
export async function createPayment(productId: number | string, quantity: number, token?: string) {
  const url = `${API_BASE}/api/v1/orders?productId=${encodeURIComponent(String(productId))}&quantity=${encodeURIComponent(String(quantity))}`;
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { method: 'GET', headers });
  return handleResponse(res);
}