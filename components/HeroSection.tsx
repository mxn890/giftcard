import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Gift, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const giftCards = [
  { 
    id: 1, 
    brand: 'US Apple Gift Card', 
    value: '$50',
    image: '/cards/apple.png'
  },
  { 
    id: 2, 
    brand: 'Binance USDT Gift Card', 
    value: '$30',
    image: '/cards/binance.png'
  },
  { 
    id: 3, 
    brand: 'US Razer Gold Gift Card', 
    value: '$25',
    image: '/cards/gold.png'
  },
  { 
    id: 4, 
    brand: 'US Hulu Gift Card', 
    value: '$20',
    image: '/cards/hulu.png'
  },
  { 
    id: 5, 
    brand: 'US PSN Gift Card', 
    value: '$40',
    image: '/cards/ps.png'
  },
  { 
    id: 6, 
    brand: 'US Steam Gift Card', 
    value: '$100',
    image: '/cards/steam1.png'
  },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-purple via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
          />
          <motion.div 
            className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-white"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-white"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Content */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="space-y-3">
                <motion.div className="flex items-center space-x-2 text-purple-200" variants={itemVariants}>
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-sm font-extrabold">Premium Gift Cards Marketplace</span>
                </motion.div>
                <motion.h1 className="text-4xl lg:text-5xl font-extrabold leading-tight" variants={itemVariants}>
                  The Perfect Gift
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                    For Everyone
                  </span>
                </motion.h1>
                <motion.p className="text-lg text-purple-100 max-w-lg" variants={itemVariants}>
                  Discover thousands of gift cards from your favorite brands. From shopping to streaming, gaming to dining - find the perfect digital gift today.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div className="flex flex-col sm:flex-row gap-3 pt-4" variants={itemVariants}>
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-6">
                  <Gift className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-6">
                  <Zap className="mr-2 h-5 w-5" />
                  Instant Delivery
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image/Visual */}
            <motion.div 
              className="relative"
              initial={{ rotate: 3 }} // Initial tilted state
              whileHover={{ 
                rotate: 0, // Straightens on hover
                transition: { 
                  type: 'spring',
                  stiffness: 300,
                  damping: 10
                } 
              }}
            >
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
                <motion.div 
                  className="absolute -top-3 -right-3 bg-yellow-400 text-brand-dark-gray px-3 py-1 rounded-full font-bold text-xs"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  🎉 Hot Deal!
                </motion.div>
                
                {/* Amazon Gift Card */}
                <div className="bg-gradient-to-r from-brand-purple to-pink-500 rounded-xl p-4 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">Amazon</h3>
                        <p className="text-purple-200 text-sm">Gift Card</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">$50</div>
                        <div className="text-xs text-purple-200">USD</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Valid Until</span>
                        <span>No Expiry</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Card Number</span>
                        <span>**** **** **** 1234</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-brand-dark-gray text-center">
                  <p className="font-semibold text-sm">Instant Digital Delivery</p>
                  <p className="text-xs text-gray-600">Ready to use in seconds</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="mt-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white rounded-full p-1 shadow-xl">
              <div className="flex items-center">
                <div className="flex-1 px-4">
                  <Input
                    type="text"
                    placeholder="Search for your favorite brands..."
                    className="border-0 focus:ring-0 text-base placeholder-gray-400"
                  />
                </div>
                <Button className="bg-brand-purple hover:bg-purple-700 text-white rounded-full px-6">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gift Cards Slider */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Popular Gift Cards</h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600">Browse our most popular gift cards</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="px-2 sm:px-4"
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="pb-12"
            >
              {giftCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <motion.div 
                    className="px-1 sm:px-2 focus:outline-none h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-48 sm:h-56 md:h-64">
                      <div className="absolute inset-0 bg-black/10 z-10" />
                      <Image
                        src={card.image}
                        alt={`${card.brand} Gift Card`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-white font-bold text-lg sm:text-xl">{card.brand}</h3>
                            <p className="text-gray-300 text-xs sm:text-sm">Gift Card</p>
                          </div>
                          <div className="text-white font-bold text-base sm:text-lg bg-black/30 px-2 sm:px-3 py-1 rounded-full">
                            {card.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;