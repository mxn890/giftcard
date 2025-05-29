'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { GiftCardData, giftCardsData } from '@/data/giftCards';
import { useCart } from '@/contexts/CartContext';

interface Props {
  params: { id: string };
}

const ProductDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<GiftCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const foundProduct = giftCardsData.find(card => card.id === params.id);
    setTimeout(() => {
      setProduct(foundProduct || null);
      setLoading(false);
    }, 300); // Small delay to show loading state
  }, [params.id]);

  useEffect(() => {
    if (product?.amounts.length && selectedAmount === 0) {
      setSelectedAmount(product.amounts[0]);
    }
  }, [product?.amounts, selectedAmount]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-light-gray flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-light-gray flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-dark-gray mb-4">Product Not Found</h2>
            <Button onClick={() => router.push('/shop')} className="bg-brand-purple hover:bg-purple-700">
              Back to Shop
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (selectedAmount === 0) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        selectedAmount,
        price: selectedAmount
      });
    }

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const rewardPoints = Math.floor(selectedAmount * 50);
  const totalPrice = selectedAmount * quantity;

  return (
    <Layout>
      <div className="min-h-screen bg-brand-light-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-4 aspect-h-3 bg-white rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-lg text-brand-dark-gray mb-4">
                  Why Choose {product.title}?
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {['Instant digital delivery', 'No expiration date', 'Easy to redeem', 'Perfect for gifting'].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-brand-purple rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating}.0) • 2,847 reviews</span>
                </div>

                <h1 className="text-3xl font-bold text-brand-dark-gray mb-4">
                  {product.title} Gift Card
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Amount Selection */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-lg text-brand-dark-gray mb-4">Select Amount</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                  {product.amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        selectedAmount === amount
                          ? 'border-brand-purple bg-brand-purple text-white'
                          : 'border-gray-300 hover:border-brand-purple'
                      }`}
                    >
                      <div className="font-bold">${amount}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-brand-purple">${selectedAmount}.00 USD</span>
                    {product.discount && (
                      <span className="text-green-600 font-medium">
                        You saved ${Math.floor(selectedAmount * (product.discount / 100))}!
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Earn {rewardPoints} reward points
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-medium text-brand-dark-gray">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-brand-purple">${totalPrice}.00</span>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-lg font-semibold transition-all ${
                    isAddedToCart 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-brand-purple hover:bg-purple-700'
                  }`}
                  disabled={selectedAmount === 0}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add {quantity} to Cart
                    </>
                  )}
                </Button>

                {/* Success Message */}
                {isAddedToCart && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {quantity} {product.title} gift card{quantity > 1 ? 's' : ''} (${selectedAmount}) added to your cart.
                  </div>
                )}

                {/* Security */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-500 text-xl mr-2">🔒</span>
                    <div>
                      <p className="text-sm font-medium text-green-800">Secure Purchase</p>
                      <p className="text-xs text-green-600">
                        256-bit SSL encryption • Instant delivery • Money-back guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;