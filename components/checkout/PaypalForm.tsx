'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface PaypalFormProps {
  totalAmount: number;
}

const PaypalForm: React.FC<PaypalFormProps> = ({ totalAmount }) => {
  const handlePaypalPayment = () => {
    console.log('Redirecting to PayPal...');
    // Redirect to PayPal payment
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          You will be redirected to PayPal to complete your payment securely.
        </p>
      </div>

      <Button 
        onClick={handlePaypalPayment}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg font-semibold"
      >
        Pay ${totalAmount.toFixed(2)} with PayPal
      </Button>
    </div>
  );
};

export default PaypalForm;