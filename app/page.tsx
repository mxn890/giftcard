'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // for App Router
import Layout from '@/components/layout';
import HeroSection from '@/components/HeroSection';
import BrandSlider from '@/components/BrandSlider';
import GiftCard from '@/components/GiftCard';
import PromotionalBanners from '@/components/PromotionalBanners';
import { giftCardsData } from '@/data/giftCards';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const router = useRouter();
  const { cartCount } = useCart();

  // Show only first 8 cards on homepage
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
              <GiftCard key={card.id} {...card} />
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
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark-gray mb-4">
              Why Choose ZakGifts?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl">
              We make gift card shopping simple, secure, and rewarding
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 hover:bg-white rounded-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl" aria-hidden="true">⚡</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-dark-gray mb-3">
                Instant Delivery
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">
                Get your digital gift cards delivered instantly to your email. No waiting required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 hover:bg-white rounded-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl" aria-hidden="true">🔒</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-dark-gray mb-3">
                100% Secure
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">
                Your transactions are protected with bank-level security and encryption.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 hover:bg-white rounded-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl" aria-hidden="true">💰</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-dark-gray mb-3">
                Best Prices
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">
                Enjoy competitive prices and exclusive discounts on all gift cards.
              </p>
            </div>
          </div>

          {/* CTA Button: Get Started */}
          <div className="text-center mt-12 lg:mt-16">
            <button
              onClick={() => router.push('/login')}
              className="bg-brand-purple hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
