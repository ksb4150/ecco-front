import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './pages';
import LoginPage from './pages/LoginPage';
import { loginRequest, fetchProfile } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 프로필 로드 시도
      fetchProfile(token)
        .then(profile => {
          setUser(profile);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        });
    }
  }, []);

  const openLoginPage = () => setShowLoginPage(true);
  const closeLoginPage = () => setShowLoginPage(false);

  // LoginPage에서 토큰을 전달 받음
  const handleLogin = (token: string, profile?: any) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUser(profile ?? null);
    setShowLoginPage(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {showLoginPage ? (
        <LoginPage onLogin={handleLogin} onCancel={closeLoginPage} />
      ) : (
        <HomePage isLoggedIn={isLoggedIn} onOpenLogin={openLoginPage} onLogout={handleLogout} user={user} />
      )}
    </>
  );
}

export default App;