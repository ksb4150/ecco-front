import React from 'react';

const FooterSection: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>고객서비스</h4>
        <ul>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">1:1 문의</a></li>
          <li><a href="#notice">공지사항</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>회사정보</h4>
        <ul>
          <li><a href="#about">소개</a></li>
          <li><a href="#terms">이용약관</a></li>
          <li><a href="#privacy">개인정보처리방침</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>팔로우</h4>
        <div className="social-links">
          <a href="#facebook">Facebook</a>
          <a href="#instagram">Instagram</a>
          <a href="#twitter">Twitter</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 ECCO Plus Store. All rights reserved.</p>
    </div>
  </footer>
);

export default FooterSection;