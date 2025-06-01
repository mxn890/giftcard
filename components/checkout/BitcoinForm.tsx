'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';

interface BitcoinFormProps {
  totalAmount: number;
}

const BitcoinForm: React.FC<BitcoinFormProps> = ({ totalAmount }) => {
  const [btcAddress] = useState('3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5');
  const [btcAmount] = useState((totalAmount * 0.000025).toFixed(8)); // Example conversion rate

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-orange-800 text-sm mb-2">
          Send exactly <strong>{btcAmount} BTC</strong> to the address below.
        </p>
        <p className="text-orange-800 text-sm">
          Your order will be processed after 3 network confirmations.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <QRCode 
            value={`bitcoin:${btcAddress}?amount=${btcAmount}`} 
            size={128} 
            className="w-full h-auto"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bitcoin Address</label>
          <div className="bg-gray-100 p-3 rounded-md text-sm font-mono break-all">
            {btcAddress}
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (BTC)</label>
          <div className="bg-gray-100 p-3 rounded-md text-sm font-mono">
            {btcAmount}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
        >
          I've Sent the Payment
        </Button>
      </div>
    </div>
  );
};

export default BitcoinForm;