'use client';
import { useUser } from '@/hooks/useUser';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { useCart } from '@/contexts/CartContext';
import CreditCardForm from '@/components/checkout/CreditCardForm';
import PaypalForm from '@/components/checkout/PaypalForm';
import { PayButton } from '@/components/checkout/BitcoinForm';
import BankTransferForm from '@/components/checkout/BankTransferForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreditCard, Wallet, Bitcoin, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface CartItem {
  id: string;
  title: string;
  selectedAmount: number;
  quantity: number;
}

const CheckoutPage = () => {
  const { cartItems, cartCount } = useCart();
  const [activePaymentMethod, setActivePaymentMethod] = useState<string>('credit-card');
  const [userId, setUserId] = useState<string | null>(null);
  
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.selectedAmount * item.quantity;
  }, 0);
  
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Safely access document.cookie inside useEffect (runs only in browser)
    const match = document.cookie.match(/auth_token=([^;]+)/);
    const token = match ? match[1] : null;

    if (token) {
      try {
        const decoded = jwtDecode<{ id: string; name: string; email: string }>(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);


  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const renderPaymentForm = () => {
    switch (activePaymentMethod) {
      case 'credit-card':
        return <CreditCardForm totalAmount={totalAmount} />;
      case 'paypal':
        return <PaypalForm totalAmount={totalAmount} />;
      case 'bitcoin':
        return (
          <PayButton 
            amount={totalAmount} 
            cartItems={cartItems.map(item => ({
              id: item.id,
              title: item.title,
              price: item.selectedAmount,
              quantity: item.quantity
            }))} 
          />
        );
      case 'bank-transfer':
        return <BankTransferForm totalAmount={totalAmount} />;
      default:
        return <CreditCardForm totalAmount={totalAmount} />;
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">There's nothing to checkout yet!</p>
            <Link href="/shop" passHref>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
            <div className="flex items-center justify-center lg:justify-start mt-2 text-sm text-gray-600">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full mr-3">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
              <Link href="/cart" className="text-purple-600 hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to cart
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Button
                    variant={activePaymentMethod === 'credit-card' ? 'default' : 'outline'}
                    onClick={() => setActivePaymentMethod('credit-card')}
                    className="flex flex-col items-center h-20 gap-2 transition-all text-black"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Credit Card</span>
                  </Button>
                  
                  <Button
                    variant={activePaymentMethod === 'paypal' ? 'default' : 'outline'}
                    onClick={() => setActivePaymentMethod('paypal')}
                    className="flex flex-col items-center h-20 gap-2 transition-all text-black"
                  >
                    <Wallet className="h-5 w-5" />
                    <span>PayPal</span>
                  </Button>
                  
                  <Button
                    variant={activePaymentMethod === 'bitcoin' ? 'default' : 'outline'}
                    onClick={() => setActivePaymentMethod('bitcoin')}
                    className="flex flex-col items-center h-20 gap-2 transition-all text-black"
                  >
                    <Bitcoin className="h-5 w-5" />
                    <span>Bitcoin</span>
                  </Button>
                  
                  <Button
                    variant={activePaymentMethod === 'bank-transfer' ? 'default' : 'outline'}
                    onClick={() => setActivePaymentMethod('bank-transfer')}
                    className="flex flex-col items-center h-20 gap-2 transition-all text-black"
                  >
                    <Banknote className="h-5 w-5" />
                    <span>Bank Transfer</span>
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  {renderPaymentForm()}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total</span>
                      <span className="text-purple-600">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-800 font-medium">
                    🎁 You'll earn {Math.floor(totalAmount * 50)} reward points with this purchase!
                  </p>
                </div>

                <div className="mt-6 text-xs text-gray-500">
                  <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;