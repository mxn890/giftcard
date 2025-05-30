'use client'
import React from 'react';
import Layout from '@/components/layout';
import HeroSection from '@/components/HeroSection';
import BrandSlider from '@/components/BrandSlider';
import GiftCard from '@/components/GiftCard';
import PromotionalBanners from '@/components/PromotionalBanners';
import { giftCardsData } from '@/data/giftCards';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const { cartCount } = useCart();
  // Show only first 6 cards on homepage
  const popularGiftCards = giftCardsData.slice(0, 8);

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Brand Slider */}
      <BrandSlider />

      {/* Popular Gift Cards Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark-gray mb-4">
              Top Gift Cards
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular digital gift cards from leading brands worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularGiftCards.map((card) => (
              <GiftCard
                key={card.id}
                {...card}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = '/shop'}
              className="bg-brand-purple hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg"
            >
              View All Gift Cards
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <PromotionalBanners />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-gray mb-4">
              Why Choose GiftHub?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make gift card shopping simple, secure, and rewarding
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-gray mb-2">
                Instant Delivery
              </h3>
              <p className="text-gray-600">
                Get your digital gift cards delivered instantly to your email. No waiting required.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-gray mb-2">
                100% Secure
              </h3>
              <p className="text-gray-600">
                Your transactions are protected with bank-level security and encryption.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-gray mb-2">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Enjoy competitive prices and exclusive discounts on all gift cards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
