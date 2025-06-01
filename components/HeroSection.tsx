import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, Star, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

// Create motion version of components
const MotionButton = motion(Button);
const MotionDiv = motion.div;

const miniCards = [
  { 
    id: 1,
    brand: 'Apple', 
    value: '$50',
    image: '/cards/apple.png',
    color: 'bg-gradient-to-br from-gray-800 to-gray-900',
    discount: '5% OFF'
  },
  { 
    id: 2,
    brand: 'Steam', 
    value: '$20',
    image: '/cards/steam.png',
    color: 'bg-gradient-to-br from-gray-700 to-gray-800',
    discount: '10% OFF'
  },
  { 
    id: 3,
    brand: 'Google Play', 
    value: '$25',
    image: '/cards/goggleplay.png',
    color: 'bg-gradient-to-br from-green-700 to-green-800',
    discount: '7% OFF'
  },
  { 
    id: 4,
    brand: 'Netflix', 
    value: '$30',
    image: '/cards/netflix.png',
    color: 'bg-gradient-to-br from-red-700 to-red-800',
    discount: '15% OFF'
  }
];

const topGiftCards = [
  {
    id: 1,
    brand: 'Amazon',
    image: '/cards/amazon1.png',
    value: '$100'
  },
  {
    id: 2,
    brand: 'Spotify',
    image: '/cards/spotify.png',
    value: '$50'
  },
  {
    id: 3,
    brand: 'PlayStation',
    image: '/cards/ps.png',
    value: '$75'
  },
  {
    id: 4,
    brand: 'Xbox',
    image: '/cards/xbox.png',
    value: '$60'
  },
  {
    id: 5,
    brand: 'Uber',
    image: '/cards/uber.png',
    value: '$40'
  },
  {
    id: 6,
    brand: 'Airbnb',
    image: '/cards/aa.png',
    value: '$150'
  }
];

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Stars data for the cosmic background
  const stars = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.8 + 0.2,
    delay: Math.random() * 5
  }));

  // Planets data
  const planets = [
    {
      id: 1,
      size: 120,
      x: 10,
      y: 20,
      color: 'bg-gradient-to-br from-purple-900/20 to-blue-900/10',
      blur: 'blur-xl'
    },
    {
      id: 2,
      size: 80,
      x: 85,
      y: 60,
      color: 'bg-gradient-to-br from-pink-900/20 to-rose-900/10',
      blur: 'blur-lg'
    },
    {
      id: 3,
      size: 60,
      x: 25,
      y: 70,
      color: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/10',
      blur: 'blur-md'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Cosmic Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/80 to-gray-900" />
        
        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: star.opacity }}
            transition={{
              delay: star.delay,
              duration: 1
            }}
          />
        ))}
        
        {/* Twinkling stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`twinkle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Planets */}
        {planets.map((planet) => (
          <div
            key={planet.id}
            className={`absolute rounded-full ${planet.color} ${planet.blur}`}
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              left: `${planet.x}%`,
              top: `${planet.y}%`,
            }}
          />
        ))}
        
        {/* Nebula clouds */}
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-purple-900/10 rounded-full mix-blend-soft-light filter blur-[100px] animate-float-slow" />
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-pink-900/10 rounded-full mix-blend-soft-light filter blur-[80px] animate-float-medium" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full mix-blend-soft-light filter blur-[60px] animate-float-fast" />
        
        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: '2px',
              height: '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px white'
            }}
            animate={{
              x: [0, 500],
              y: [0, 500],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 10,
              repeat: Infinity,
              repeatDelay: Math.random() * 15 + 5,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden pt-24 pb-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-purple-300 border border-white/10"
                  variants={itemVariants}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Digital Gift Cards Marketplace</span>
                </motion.div>
                
                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight" variants={itemVariants}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-300">
                    Gift Smarter,
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-rose-400">
                    Not Harder
                  </span>
                </motion.h1>
                
                <motion.p className="text-lg text-gray-300 max-w-lg leading-relaxed" variants={itemVariants}>
                  Instant delivery of digital gift cards from top brands worldwide. Perfect for birthdays, holidays, or just because.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div className="flex flex-col sm:flex-row gap-4 pt-2" variants={itemVariants}>
                <Link href="/shop" passHref>
                  <MotionButton 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-bold px-8 py-6 text-lg shadow-lg hover:shadow-purple-500/20 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Shop Gift Cards
                  </MotionButton>
                </Link>
                <MotionButton 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/5 hover:border-white/30 font-bold px-8 py-6 text-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  View Details
                </MotionButton>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-300"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/10 overflow-hidden">
                       
                      </div>
                    ))}
                  </div>
                  <span className="ml-3">10,000+ Happy Customers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                  <span className="ml-2">4.9/5 (2,483 Reviews)</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Mini Cards Grid */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                {miniCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className={`${card.color} rounded-xl p-4 border border-white/10 shadow-lg overflow-hidden relative h-40`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.4 + (index * 0.1),
                      type: 'spring',
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      y: -5,
                      transition: { 
                        type: 'spring',
                        stiffness: 300,
                        damping: 10
                      } 
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className={`absolute -inset-4 bg-${card.color.split(' ')[1].split('-')[1]}-500/10 rounded-xl filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <Image
                        src={card.image}
                        alt={`${card.brand} Gift Card`}
                        fill
                        className="object-cover opacity-70"
                      />
                    </div>
                    
                    {/* Discount badge */}
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold z-10">
                      {card.discount}
                    </div>
                    
                    {/* Card content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="text-lg font-bold text-white">{card.brand}</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{card.value}</div>
                        <div className="text-xs text-white/80">eGift Card</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top Gift Cards Slider Section - Consistent Image Sizes */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-purple-900">Top Gift Cards</h2>
            <p className="mt-2 text-lg text-gray-600">Most popular gift cards our customers love</p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="pb-12"
            >
              {topGiftCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <div className="h-64 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[200px] mx-auto">
                      <Image
                        src={card.image}
                        alt={`${card.brand} Gift Card`}
                        fill
                        className="object-contain"
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;