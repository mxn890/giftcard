
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Zap, CreditCard } from 'lucide-react';

const PromotionalBanners = () => {
  const banners = [
    {
      id: 1,
      title: "Get 10% Off on Apple Cards!",
      subtitle: "Limited time offer on all Apple gift cards",
      cta: "Shop Apple Cards",
      icon: Gift,
      gradient: "from-brand-purple to-purple-700",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "New: BTC Payment Now Live",
      subtitle: "Pay with Bitcoin and get instant delivery",
      cta: "Learn More",
      icon: CreditCard,
      gradient: "from-orange-500 to-red-600",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Flash Sale: Gaming Cards 25% Off",
      subtitle: "Steam, PlayStation, Xbox cards on sale now",
      cta: "Shop Gaming",
      icon: Zap,
      gradient: "from-green-500 to-emerald-600",
      textColor: "text-white"
    }
  ];

  return (
    <section className="py-16 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark-gray mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these limited-time deals and exclusive offers
          </p>
        </div>

        <div className="space-y-6">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`bg-gradient-to-r ${banner.gradient} rounded-3xl p-8 lg:p-12 relative overflow-hidden group cursor-pointer transform hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-white animate-pulse delay-700"></div>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <banner.icon className={`h-8 w-8 ${banner.textColor}`} />
                  </div>
                  <div>
                    <h3 className={`text-2xl lg:text-3xl font-bold ${banner.textColor} mb-2`}>
                      {banner.title}
                    </h3>
                    <p className={`text-lg ${banner.textColor} opacity-90`}>
                      {banner.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Button 
                    size="lg"
                    className="bg-white text-brand-dark-gray hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                  >
                    {banner.cta}
                  </Button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
