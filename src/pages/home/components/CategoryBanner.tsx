import React from 'react';

const CategoryBanner: React.FC = () => {
  return (
    <div className="category-banner">
      <div className="category-container">
        <button className="category-btn">전체</button>
        <button className="category-btn">패션</button>
        <button className="category-btn">신발</button>
        <button className="category-btn">가방</button>
        <button className="category-btn">액세서리</button>
        <button className="category-btn">시계</button>
      </div>
    </div>
  );
};

export default CategoryBanner;