import React from 'react';
import { Product } from '../../index';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-item">
      {product.badge && <span className="badge">{product.badge}</span>}
      <div className="product-image">
        <span className="emoji-image">{product.image}</span>
        <button className="heart-btn">♡</button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <span className="stars">★</span>
          <span className="rating-value">{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="discount-rate">{product.discount}%</span>
          <span className="current-price">{product.price.toLocaleString()}원</span>
        </div>
        <span className="original-price">{product.originalPrice.toLocaleString()}원</span>

        <div className="product-tags">
          <span className="tag">배송료 조건 미충족</span>
        </div>

        <button className="add-cart-btn">장바구니</button>
      </div>
    </div>
  );
};

export default ProductItem;