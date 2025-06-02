'use client';

import React from 'react';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();
  const router = useRouter();

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.selectedAmount * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <ShoppingBag className="h-24 w-24 text-gray-700 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart!</p>
              <Link href="/shop" passHref>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{cartCount} items in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.id}-${item.selectedAmount}`} 
                    className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-20 h-20 object-contain rounded-lg bg-gray-50 p-2"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-purple-600 font-bold text-lg">
                          ${item.selectedAmount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Earn {Math.floor(item.selectedAmount * 50)} reward points
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedAmount, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="font-medium text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.selectedAmount, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            ${(item.selectedAmount * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id, item.selectedAmount)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Processing Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total</span>
                      <span className="text-purple-600">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link 
                    href="/shop" 
                    className="text-purple-600 hover:text-purple-700 hover:underline text-sm font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-800 font-medium">
                    🎁 You'll earn {Math.floor(totalAmount * 50)} reward points with this purchase!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;