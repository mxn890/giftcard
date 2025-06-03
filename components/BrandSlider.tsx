import React, { useEffect, useRef } from 'react';

const BrandSlider = () => {
  const brands = [
    { name: 'Amazon', logo: '/images/amazon.png' },
    { name: 'Apple', logo: '/images/apple.png' },
    { name: 'Netflix', logo: '/images/netflix.png' },
    { name: 'Spotify', logo: '/images/spotify.png' },
    { name: 'Steam', logo: '/images/steam.png' },
    { name: 'Google Play', logo: '/images/goggle.png' },
    { name: 'PlayStation', logo: '/images/ps.png' },
    { name: 'Xbox', logo: '/images/xbox.png' },
    { name: 'Target', logo: '/images/target.png' },
    { name: 'Walmart', logo: '/images/walmart.png' },
    { name: 'Uber', logo: '/images/uber.png' },
    { name: 'DoorDash', logo: '/images/doordash.png' },
    { name: 'Nike', logo: '/images/nike.png' },
    { name: 'Adidas', logo: '/images/adidas.png' },
    { name: 'H&M', logo: '/images/hm.png' }
  ];

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.animation = 'slideLeft 30s linear infinite';
    }
  }, []);

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .brand-card {
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .brand-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by millions worldwide
          </h2>
          <p className="text-gray-600 text-lg">Shop gift cards from 500+ popular brands</p>
        </div>
        
        <div className="relative overflow-hidden py-4">
          <div 
            ref={sliderRef}
            className="flex items-center whitespace-nowrap"
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="inline-flex mx-4"
              >
                <div className="brand-card bg-white rounded-xl p-4 w-32 h-32 flex flex-col items-center justify-center border border-gray-100 hover:border-purple-200 cursor-pointer">
                  <div className="h-12 w-12 mb-3 flex items-center justify-center">
                    {/* Replace with actual logo image */}
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logos/default.svg';
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;