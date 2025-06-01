'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface BankTransferFormProps {
  totalAmount: number;
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({ totalAmount }) => {
  const bankDetails = {
    accountName: "Your Company Name",
    accountNumber: "1234567890",
    bankName: "International Bank",
    routingNumber: "021000021",
    swiftCode: "BOFAUS3N",
    reference: `ORDER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          Please transfer the exact amount to our bank account. Your order will be processed after we receive the payment.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Account Name:</span>
          <span className="font-medium">{bankDetails.accountName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Account Number:</span>
          <span className="font-medium">{bankDetails.accountNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bank Name:</span>
          <span className="font-medium">{bankDetails.bankName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Routing Number:</span>
          <span className="font-medium">{bankDetails.routingNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">SWIFT Code:</span>
          <span className="font-medium">{bankDetails.swiftCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reference:</span>
          <span className="font-medium">{bankDetails.reference}</span>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
        >
          I've Completed the Transfer
        </Button>
      </div>
    </div>
  );
};

export default BankTransferForm;