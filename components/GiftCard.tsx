'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface GiftCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount?: number;
  popular?: boolean;
  amounts: number[];
}

const GiftCard: React.FC<GiftCardProps> = ({
  id,
  title,
  description,
  image,
  originalPrice,
  salePrice,
  discount,
  popular = false,
  amounts
}) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const savings = originalPrice - salePrice;
  const discountPercent = Math.round((savings / originalPrice) * 100);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      const defaultAmount = amounts[0];
      await addToCart({
        id,
        title,
        image,
        selectedAmount: defaultAmount,
        price: defaultAmount
      });
      setIsAdded(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="relative rounded-lg bg-transparent transition-all duration-300 overflow-hidden flex flex-col h-full">
      <Link href={`/product/${id}`} className="block flex-1 flex flex-col items-center text-center p-2 pb-1"> {/* Reduced pb-2 to pb-1 */}
        <div className="absolute top-3 left-3 z-10 flex space-x-2">
          {popular && (
            <div className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium">
              Popular
            </div>
          )}
          {discount && (
            <div className="bg-brand-purple text-white px-2 py-1 rounded text-xs font-medium">
              -{discountPercent}%
            </div>
          )}
        </div>

        <div className="relative w-32 h-32 overflow-hidden mb-3">
          <Image
            src={image}
            alt={title}
            width={128}
            height={128}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.png';
            }}
          />
        </div>

        <div className="flex-1 flex flex-col items-center w-full">
          <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-brand-purple transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 text-xs line-clamp-2 mb-2">
            {description}
          </p>

          <div className="flex flex-col items-center mt-auto w-full">
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-brand-purple">
                {formatCurrency(salePrice)}
              </span>
              {savings > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatCurrency(amounts[0])} - {formatCurrency(amounts[amounts.length - 1])}
            </div>
          </div>
        </div>
      </Link>

      {/* Tightened button container padding */}
      <div className="px-0 pb-1 w-full text-center "> {/* Reduced px-2 to px-1 and pb-2 to pb-1 */}
        <Button 
          onClick={handleAddToCart}
          className={`w-36 ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-purple-900 to-purple-300 hover:from-purple-400 hover:to-purple-900'} transition-colors text-xs`} // Added text-xs for smaller text
          size="sm"
          disabled={isLoading}
        >
          {isAdded ? (
            <>
              <Check className="mr-1 h-3 w-3" /> {/* Reduced icon size */}
              Added
            </>
          ) : isLoading ? (
            'Adding...'
          ) : (
            <>
              <ShoppingCart className="mr-1 h-3 w-3" /> {/* Reduced icon size */}
              Add 
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GiftCard;