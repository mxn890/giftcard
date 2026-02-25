'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PaymentErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  totalAmount: number;
  errorMessage?: string;
}

const PaymentErrorModal: React.FC<PaymentErrorModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
  totalAmount,
  errorMessage = "Your card is not working"
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm max-w-[90%] border-2 border-red-400 shadow-2xl bg-white rounded-lg">
        {/* Top error bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-red-600"></div>
        
        <DialogHeader className="pt-4 pb-2">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={2} />
            </div>
          </div>
          <DialogTitle className="text-center text-base font-bold text-gray-900">
            Sorry, Payment Failed
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-red-700 font-medium mt-1">
            We couldn't process your card. No charges were made.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {/* Error banner */}
          <div className="bg-red-50 border border-red-300 rounded-lg p-2.5">
            <p className="text-xs text-red-800">
              ⚠️ <strong>Payment Error:</strong> Your payment method was declined. Don't worry, you haven't been charged.
            </p>
          </div>

          {/* Invoice ID */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-300">
            <p className="text-xs text-blue-600 mb-1 font-semibold">Your Invoice ID:</p>
            <p className="text-sm font-mono font-bold text-blue-900 bg-white px-2 py-1.5 rounded border border-blue-200">
              INV-{Date.now().toString().slice(-8).toUpperCase()}
            </p>
            <p className="text-xs text-blue-700 mt-2">
              We have this invoice on file. Just complete the payment below to process your order.
            </p>
          </div>

          {/* Total Amount - Simple */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-300">
            <p className="text-xs text-gray-600 mb-1">Amount Due:</p>
            <p className="text-2xl font-bold text-gray-900">
              ${totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Wallet Address Section */}
          <div>
            <label className="text-xs font-bold text-gray-800 mb-2 block">
              💳 Send Payment To:
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-1 bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 px-3 py-2 bg-transparent text-xs font-mono text-gray-800 focus:outline-none break-all"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-2.5 py-2 transition-all flex items-center gap-1 flex-shrink-0 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                  }`}
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 font-medium">✓ Copied</p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-green-50 border border-green-300 rounded-lg p-2.5">
            <p className="text-xs text-green-900 leading-relaxed">
              <strong>How to pay:</strong> Copy the wallet address above, send exactly <strong>${totalAmount.toFixed(2)}</strong> to it. Your order will be processed automatically when we receive it.
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 text-sm rounded-lg transition-all"
          >
            Try Another Method
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentErrorModal;
