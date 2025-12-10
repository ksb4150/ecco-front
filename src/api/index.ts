export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

export async function loginRequest(username: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Login failed');
  }
  return res.json(); // 기대: { token: string, user: { name: string, ... } }
}

export async function fetchProfile(token: string) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json(); // 기대: user object
}