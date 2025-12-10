import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { loginRequest } from '../api';

interface LoginPageProps {
  onLogin: (token: string, profile?: any) => void;
  onCancel: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveId, setSaveId] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await loginRequest(username, password);
      if (saveId) {
        localStorage.setItem('savedUsername', username);
      } else {
        localStorage.removeItem('savedUsername');
      }
      onLogin(data.token, data.user);
    } catch (err: any) {
      setError(err.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('savedUsername');
    if (saved) {
      setUsername(saved);
      setSaveId(true);
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 로고 */}
        <button type="button" className="login-logo-btn" onClick={onCancel}>
          <h1>ECCO</h1>
        </button>

        {/* 로그인 폼 */}
        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="form-input"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          {/* 에러 메시지 */}
          {error && <div className="error-message">{error}</div>}

          {/* 체크박스 & 링크 */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={saveId}
                onChange={e => setSaveId(e.target.checked)}
              />
              <span>아이디 저장</span>
            </label>
            <div className="help-links">
              <a href="#find-id">아이디 찾기</a>
              <span>|</span>
              <a href="#find-pw">비밀번호 찾기</a>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 회원가입 & 취소 */}
        <div className="form-footer">
          <button type="button" onClick={onCancel} className="cancel-btn">
            취소
          </button>
          <button type="button" className="signup-btn">
            회원가입
          </button>
        </div>

        {/* 구분선 */}
        <div className="divider">
          <span>또는</span>
        </div>

        {/* 소셜 로그인 */}
        <div className="social-login">
          <button type="button" className="social-btn kakao">
            <span>카카오로 로그인</span>
          </button>
          <button type="button" className="social-btn naver">
            <span>네이버로 로그인</span>
          </button>
          <button type="button" className="social-btn google">
            <span>Google로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;