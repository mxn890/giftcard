import React, { useEffect, useRef } from 'react';

const BrandSlider = () => {
  const brands = [
    'Amazon', 'Apple', 'Netflix', 'Spotify', 'Steam', 'Google Play', 
    'PlayStation', 'Xbox', 'Starbucks', 'Target', 'Walmart', 'Best Buy',
    'iTunes', 'Uber', 'DoorDash', 'Nike', 'Adidas', 'H&M'
  ];

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.animation = 'slideLeft 20s linear infinite';
    }
  }, []);

  return (
    <section className="py-8 bg-white border-t border-b border-gray-100 overflow-hidden">
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-brand-dark-gray">
            Trusted by millions worldwide
          </h2>
          <p className="text-gray-600">Shop gift cards from 500+ popular brands</p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex animate-slide-left whitespace-nowrap"
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="inline-flex mx-8 items-center justify-center h-16 w-32"
              >
                <div className="bg-gray-50 hover:bg-brand-purple hover:text-white transition-all duration-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:border-brand-purple cursor-pointer">
                  {brand}
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