import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  user?: any;
}

const HeaderBar: React.FC<HeaderProps> = ({ isLoggedIn, onOpenLogin, onLogout, user }) => {
  return (
    <header className="header-nav">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo">ECCO</h1>
          <span className="logo-subtitle">Plus Store</span>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="상품명, 브랜드 검색" />
          <button>🔍</button>
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {user?.name ? <span style={{ fontWeight: 600 }}>안녕하세요, {user.name}님</span> : <span style={{ fontWeight: 600 }}>안녕하세요</span>}
              <button className="icon-btn">🛒</button>
              <button className="icon-btn" onClick={onLogout}>로그아웃</button>
            </div>
          ) : (
            <>
              <button className="icon-btn" onClick={onOpenLogin}>로그인</button>
              <button className="icon-btn">회원가입</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;