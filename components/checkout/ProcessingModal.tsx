'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CreditCard, CheckCircle } from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({ isOpen }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm max-w-[90%] border-0 shadow-2xl bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center py-8 px-4">
          {/* Animated card icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white">
              <CreditCard className="w-8 h-8" />
            </div>
          </div>

          {/* Processing text */}
          <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">
            Processing Payment
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Please wait while we process your payment...
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full w-1/3 animate-pulse"></div>
          </div>

          {/* Loading dots */}
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Processing steps */}
          <div className="w-full mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <p className="text-xs text-gray-600">Card Details Validated</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600">Processing Transaction</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-400">Finalizing Order</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingModal;
