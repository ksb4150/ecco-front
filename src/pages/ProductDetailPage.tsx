import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetailPage.css';
import { createPayment } from '../api'; // 추가

interface ProductDetailPageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  user?: any;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ isLoggedIn, onOpenLogin, user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // 더미 상품 데이터 (실제로는 API에서 가져옴)
  const products: any = {
    '1': { id: 1, name: '프리미엄 스니커즈', price: 79900, originalPrice: 129000, discount: 38, image: '👟' },
    '2': { id: 2, name: '클래식 백팩', price: 49900, originalPrice: 99000, discount: 50, image: '🎒', rating: 4.7, reviews: 1567, badge: 'NEW' },
    '3': { id: 3, name: '스포츠 모자', price: 29900, originalPrice: 59000, discount: 49, image: '🧢', rating: 4.6, reviews: 892 },
    '4': { id: 4, name: '선글라스', price: 89900, originalPrice: 149000, discount: 39, image: '😎', rating: 4.9, reviews: 3421, badge: 'BEST' },
    '5': { id: 5, name: '운동화', price: 69900, originalPrice: 119000, discount: 41, image: '🏃', rating: 4.5, reviews: 1234 },
    '6': { id: 6, name: '지갑', price: 39900, originalPrice: 79000, discount: 49, image: '👛', rating: 4.7, reviews: 2156 },
    '7': { id: 7, name: '벨트', price: 34900, originalPrice: 69000, discount: 49, image: '🎀', rating: 4.6, reviews: 567 },
    '8': { id: 8, name: '시계', price: 199900, originalPrice: 399000, discount: 50, image: '⌚', rating: 4.8, reviews: 4521, badge: 'HOT' },
  };
  const product = products[id || '1'];
  if (!product) return <div className="product-detail">상품을 찾을 수 없습니다.</div>;

  const handleAddToCart = () => {
    if (!isLoggedIn) { onOpenLogin(); return; }
    setCartCount(cartCount + quantity);
    alert(`${product.name} ${quantity}개를 장바구니에 추가했습니다!`);
    setQuantity(1);
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      onOpenLogin();
      return;
    }
    try {
      const token = localStorage.getItem('token') || undefined;
      const res = await createPayment(product.id, quantity, token);
      // 백엔드가 { paymentUrl: string } 형태로 반환한다고 가정
      if (res && (res.paymentUrl || res.redirectUrl || res.url)) {
        const redirect = res.paymentUrl || res.redirectUrl || res.url;
        window.location.href = redirect;
        return;
      }
      // 없으면 경고 또는 백업 동작
      alert('결제 세션이 생성되었습니다. 결제 페이지로 이동합니다.');
      // fallback: 직접 생성한 URL로 이동 (API_BASE를 사용하려면 import 또는 하드코드)
      window.location.href = `/payment/?productId=${product.id}&quantity=${quantity}`;
    } catch (err: any) {
      alert(err?.message || '결제 요청에 실패했습니다.');
    }
  };

  return (
    <div className="product-detail">
      {/* 헤더 */}
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>← 돌아가기</button>
        <h1 className="detail-logo">ECCO</h1>
        
        {/* 헤더 우측 */}
        <div className="header-right">
          {isLoggedIn ? (
            <div className="user-header">
              <button className="header-link">마이페이지</button>
              <span className="divider">|</span>
              <button className="header-link">
                장바구니<span className="cart-badge">{cartCount}</span>
              </button>
              <span className="divider">|</span>
              <span className="user-name">{user?.name || '사용자'}</span>
            </div>
          ) : (
            <button className="login-btn-header" onClick={onOpenLogin}>로그인</button>
          )}
        </div>
      </header>

      {/* 상품 상세 컨테이너 */}
      <div className="detail-container">
        {/* 이미지 섹션 */}
        <div className="detail-image-section">
          <div className="detail-image">
            <span className="detail-emoji">{product.image}</span>
          </div>
          {product.badge && <span className="detail-badge">{product.badge}</span>}
        </div>

        {/* 정보 섹션 */}
        <div className="detail-info-section">
          <h2 className="detail-name">{product.name}</h2>

          {/* 평점 */}
          <div className="detail-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">({product.reviews}명)</span>
          </div>

          {/* 가격 */}
          <div className="detail-price-section">
            <div className="price-row">
              <span className="label">판매가</span>
              <span className="value">
                <span className="discount-badge">{product.discount}%</span>
                <span className="current-price">{product.price.toLocaleString()}원</span>
              </span>
            </div>
            <div className="price-row">
              <span className="label">정가</span>
              <span className="original-price">{product.originalPrice.toLocaleString()}원</span>
            </div>
            <div className="price-row">
              <span className="label">할인액</span>
              <span className="discount-amount">{(product.originalPrice - product.price).toLocaleString()}원</span>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="delivery-info">
            <div className="info-row">
              <span className="info-label">배송료</span>
              <span className="info-value">조건 미충족 시 2,500원</span>
            </div>
            <div className="info-row">
              <span className="info-label">배송방법</span>
              <span className="info-value">일반배송</span>
            </div>
            <div className="info-row">
              <span className="info-label">배송일</span>
              <span className="info-value">2-3일</span>
            </div>
          </div>

          {/* 수량 선택 */}
          <div className="quantity-section">
            <label>수량</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="action-buttons">
            <button className="wishlist-btn">♡ 찜하기</button>
            <button className="buy-btn" onClick={handleBuyNow}>구매하기</button>
            <button className="cart-btn" onClick={handleAddToCart}>장바구니</button>
          </div>

          {/* 유저 인포 */}
          {isLoggedIn && user && (
            <div className="user-info">
              <p>{user.name}님, 이 상품을 구매하시겠어요?</p>
            </div>
          )}
        </div>
      </div>

      {/* 상품 상세 설명 */}
      <section className="detail-description">
        <h3>상품 설명</h3>
        <p>
          이 상품은 최고 품질의 재료로 만들어진 프리미엄 제품입니다. 
          편안함과 스타일을 모두 갖춘 이 상품은 일상생활에 완벽하게 어울립니다.
        </p>
        <ul>
          <li>최고의 품질 재료 사용</li>
          <li>편안한 착용감</li>
          <li>세련된 디자인</li>
          <li>오래 지속되는 내구성</li>
        </ul>
      </section>

      {/* 리뷰 섹션 */}
      <section className="detail-reviews">
        <h3>상품 리뷰</h3>
        <div className="review-item">
          <div className="review-header">
            <span className="reviewer-name">김철수</span>
            <span className="review-rating">★★★★★</span>
          </div>
          <p className="review-text">정말 좋은 상품입니다! 추천합니다.</p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <span className="reviewer-name">이영희</span>
            <span className="review-rating">★★★★☆</span>
          </div>
          <p className="review-text">품질이 좋고 배송도 빨랐어요.</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="detail-footer">
        <p>&copy; 2025 ECCO Plus Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductDetailPage;