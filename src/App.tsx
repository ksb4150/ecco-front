import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { loginRequest, fetchProfile, setUnauthorizedCallback } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setUnauthorizedCallback(() => {
      setIsLoggedIn(false);
      setUser(null);
      setShowLoginPage(true);
    });

    const token = localStorage.getItem('token');
    if (token) {
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

  if (showLoginPage) {
    return <LoginPage onLogin={handleLogin} onCancel={closeLoginPage} />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage isLoggedIn={isLoggedIn} onOpenLogin={openLoginPage} onLogout={handleLogout} user={user} />} 
        />
        <Route 
          path="/product/:id" 
          element={<ProductDetailPage isLoggedIn={isLoggedIn} onOpenLogin={openLoginPage} user={user} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;