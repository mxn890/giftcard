'use client'
import { Zap, ShieldCheck, CreditCard, MessageSquare, Gamepad } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const features = [
    {
      icon: <Gamepad className="w-8 h-8 text-black" />,
      title: "Built for Gamers, by Gamers",
      description: "We know the grind — that's why we deliver real, region-ready gift cards that work every time."
    },
    {
      icon: <Zap className="w-8 h-8 text-black" />,
      title: "Instant Delivery",
      description: "No waiting. Get your codes within minutes straight to your inbox or dashboard."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-black" />,
      title: "100% Legit & Verified",
      description: "No fake cards, no shady sellers. Every code is verified & guaranteed to work."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-black" />,
      title: "Multiple Payment Options",
      description: "Pay with Crypto, PayPal, Stripe, and more — whatever works best for you."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-black" />,
      title: "Fast Support, Real People",
      description: "Got a problem? We reply fast. Real humans, real help — not bots."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 -skew-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center py-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
            >
              Why Choose <span className="text-gray-900">ZakMart</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We're not just another gift card site — we're your shortcut to instant top-ups, trusted codes, and smooth service.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-600">Happy Gamers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">99%</div>
              <div className="text-gray-600">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-600">Games Supported</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
            <div className="relative z-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Level Up Your Gaming?</h2>
                <p className="text-purple-100 max-w-2xl mx-auto mb-8 text-lg">
                  Join thousands of gamers who trust ZakMart for instant, reliable gift cards.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/shop" passHref>
                    <Button 
                      size="lg" 
                      className="bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-lg"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/contact" passHref>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="text-white border-white hover:bg-purple-700/20 font-bold"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-400/20 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-400/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gaming Roots</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Founded by passionate gamers who were tired of unreliable gift card services, GameKart was born out of frustration and built with love.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Gamepad className="w-12 h-12 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gamer-First Approach</h3>
              <p className="text-gray-600">
                Every decision we make is through the lens of what would serve gamers best.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Transparency</h3>
              <p className="text-gray-600">
                We maintain the highest standards of integrity in all our transactions.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Zap className="w-12 h-12 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast Delivery</h3>
              <p className="text-gray-600">
                We understand the thrill of the game and deliver without delay.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;