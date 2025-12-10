import React from 'react';

interface Props {
  productCount: number;
}

const FilterSection: React.FC<Props> = ({ productCount }) => {
  return (
    <section className="filter-section">
      <div className="filter-container">
        <div className="sort-options">
          <button className="sort-btn active">추천순</button>
          <button className="sort-btn">최신순</button>
          <button className="sort-btn">낮은가격</button>
          <button className="sort-btn">높은가격</button>
          <button className="sort-btn">리뷰순</button>
        </div>
        <div className="view-options">
          <span>상품 {productCount}개</span>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;