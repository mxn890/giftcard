import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Zap, CreditCard } from 'lucide-react';
import Link from 'next/link';

const PromotionalBanners = () => {
  const banners = [
    {
      id: 1,
      title: "GET 10% OFF ON APPLE CARDS!",
      subtitle: "LIMITED TIME OFFER ON ALL APPLE GIFT CARDS",
      cta: "SHOP APPLE CARDS",
      icon: Gift,
      gradient: "from-brand-purple to-purple-700",
      textColor: "text-white",
      url: "/shop?category=apple"
    },
    {
      id: 2,
      title: "NEW: BTC PAYMENT NOW LIVE!",
      subtitle: "PAY WITH BITCOIN AND GET INSTANT DELIVERY",
      cta: "SHOP NOW",
      icon: CreditCard,
      gradient: "from-orange-500 to-red-600",
      textColor: "text-white",
      url: "/shop?payment=btc"
    },
    {
      id: 3,
      title: "FLASH SALE: GAMING CARDS 25% OFF!",
      subtitle: "STEAM, PLAYSTATION, XBOX CARDS ON SALE NOW",
      cta: "SHOP GAMING",
      icon: Zap,
      gradient: "from-green-500 to-emerald-600",
      textColor: "text-white",
      url: "/shop?category=gaming"
    }
  ];

  return (
    <section className="py-16 bg-purple-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-brand-dark-gray dark:text-white mb-4 tracking-tight">
            SPECIAL OFFERS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-semibold">
            DON'T MISS OUT ON THESE LIMITED-TIME DEALS AND EXCLUSIVE OFFERS
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => (
            <Link href={banner.url} key={banner.id} passHref legacyBehavior>
              <div
                className={`bg-gradient-to-r ${banner.gradient} rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl`}
                role="link"
                tabIndex={0}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-white animate-pulse delay-700"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start space-x-5 mb-8">
                    <div className="bg-white bg-opacity-30 p-4 rounded-xl flex-shrink-0">
                      <banner.icon className={`h-8 w-8 ${banner.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black ${banner.textColor} mb-3 leading-tight tracking-wide`}>
                        {banner.title}
                      </h3>
                      <p className={`${banner.textColor} opacity-90 text-base font-bold`}>
                        {banner.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6">
                  <Button 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-extrabold w-full py-6 text-lg tracking-wide"
                    asChild
                  >
                    <span>{banner.cta}</span>
                  </Button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/shop" passHref legacyBehavior>
            <Button 
              variant="outline" 
              
              className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white font-extrabold text-lg px-8 py-6"
              asChild
            >
              <span>VIEW ALL OFFERS</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;