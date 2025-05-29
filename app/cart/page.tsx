'use client';

import React from 'react';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.selectedAmount * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-light-gray">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-brand-dark-gray mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart!</p>
              <Link href="/shop" passHref>
                <Button className="bg-brand-purple hover:bg-purple-700 text-white px-8 py-3">
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
      <div className="min-h-screen bg-brand-light-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-dark-gray">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{cartCount} items in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedAmount}`} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-brand-dark-gray">
                          {item.title} Gift Card
                        </h3>
                        <p className="text-brand-purple font-bold text-xl">
                          ${item.selectedAmount}
                        </p>
                        <p className="text-sm text-gray-600">
                          Earn {Math.floor(item.selectedAmount * 50)} reward points
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.selectedAmount, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="font-semibold text-lg w-8 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.selectedAmount, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xl text-brand-dark-gray">
                          ${(item.selectedAmount * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id, item.selectedAmount)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-bold text-brand-dark-gray mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-brand-purple">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-brand-purple hover:bg-purple-700 text-white py-3 text-lg font-semibold">
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link href="/shop" className="text-brand-purple hover:underline text-sm">
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
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
