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
    <div className="relative bg-white rounded-lg border border-gray-200 hover:border-brand-purple/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full">
      <Link href={`/product/${id}`} className="block flex-1">
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

        <div className="relative h-48 bg-gray-50 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Handle image error if needed
            }}
          />
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-brand-purple transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {description}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold text-brand-purple">
                {formatCurrency(salePrice)}
              </span>
              {savings > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Values from {formatCurrency(amounts[0])} to {formatCurrency(amounts[amounts.length - 1])}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className={`w-full ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-purple hover:bg-brand-purple/90'} transition-colors`}
          size="sm"
          disabled={isLoading}
        >
          {isAdded ? (
            <>
              <Check className="mr-2 h-3.5 w-3.5" />
              Added
            </>
          ) : isLoading ? (
            'Adding...'
          ) : (
            <>
              <ShoppingCart className="mr-2 h-3.5 w-3.5" />
              Add 
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GiftCard;