import React from 'react';
import { Product } from '../index';
import ProductItem from './ProductItem';

interface Props {
  products: Product[];
}

const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <section className="products-section">
      <div className="products-grid">
        {products.map(p => <ProductItem key={p.id} product={p} />)}
      </div>
    </section>
  );
};

export default ProductsGrid;