import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: 360,
  maxWidth: '90%',
  background: '#fff',
  borderRadius: 8,
  padding: 20,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: 10,
  borderRadius: 6,
  border: '1px solid #ddd',
  fontSize: 14,
};

const btnStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  backgroundColor: '#1a73e8',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontWeight: 600,
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 인증은 없고 데모용으로 바로 로그인 처리
    onLogin();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginBottom: 12 }}>로그인</h3>
        <form onSubmit={submit}>
          <input
            style={inputStyle}
            placeholder="이메일 또는 전화번호"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" style={btnStyle}>로그인</button>
        </form>
        <button onClick={onClose} style={{ marginTop: 10, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;