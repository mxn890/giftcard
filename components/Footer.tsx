import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About GiftHub</h3>
            <p className="text-gray-300 text-sm">
              Your trusted destination for digital gift cards from top brands worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Ways to Pay</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Visa</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Mastercard</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">PayPal</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Apple Pay</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">Bitcoin</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 GiftHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
