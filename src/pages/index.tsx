import React, { useState } from 'react';
import '../styles/HomePage.css';
import HeaderBar from './home/components/HeaderBar';
import CategoryBanner from './home/components/CategoryBanner';
import MainBanner from './home/components/MainBanner';
import FilterSection from './home/components/FilterSection';
import ProductsGrid from './home/components/ProductsGrid';
import FooterSection from './home/components/FooterSection';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

interface HomePageProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  user?: any;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, onOpenLogin, onLogout, user }) => {
  const [products] = useState<Product[]>([
    { id: 1, name: '프리미엄 스니커즈', price: 79900, originalPrice: 129000, discount: 38, image: '👟', rating: 4.8, reviews: 2345, badge: 'HOT' },
    { id: 2, name: '클래식 백팩', price: 49900, originalPrice: 99000, discount: 50, image: '🎒', rating: 4.7, reviews: 1567, badge: 'NEW' },
    { id: 3, name: '스포츠 모자', price: 29900, originalPrice: 59000, discount: 49, image: '🧢', rating: 4.6, reviews: 892 },
    { id: 4, name: '선글라스', price: 89900, originalPrice: 149000, discount: 39, image: '😎', rating: 4.9, reviews: 3421, badge: 'BEST' },
    { id: 5, name: '운동화', price: 69900, originalPrice: 119000, discount: 41, image: '🏃', rating: 4.5, reviews: 1234 },
    { id: 6, name: '지갑', price: 39900, originalPrice: 79000, discount: 49, image: '👛', rating: 4.7, reviews: 2156 },
    { id: 7, name: '벨트', price: 34900, originalPrice: 69000, discount: 49, image: '🎀', rating: 4.6, reviews: 567 },
    { id: 8, name: '시계', price: 199900, originalPrice: 399000, discount: 50, image: '⌚', rating: 4.8, reviews: 4521, badge: 'HOT' },
  ]);

  return (
    <div className="home-page">
      <HeaderBar isLoggedIn={isLoggedIn} onOpenLogin={onOpenLogin} onLogout={onLogout} user={user} />
      <CategoryBanner />
      <MainBanner />
      <FilterSection productCount={products.length} />
      <ProductsGrid products={products} />
      <FooterSection />
    </div>
  );
};

export default HomePage;