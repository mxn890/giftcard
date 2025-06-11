'use client'
import { jwtDecode } from 'jwt-decode';
import { useState, useMemo, useCallback } from 'react'

interface CartItem {
  id: string;
  name?: string;
  title:string;  // Made optional
  price: number;
  quantity: number;
  productName?: string; 
  // Alternative name field
}
type UserToken = {
  id: string;
  name: string;
  email: string;
  // add other JWT payload properties if needed
};
interface PayButtonProps {
  amount: number;
  cartItems?: CartItem[];
}

export function PayButton({ amount = 0, cartItems = [] }: PayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phonenumber: ''
  });

  // Calculate total amount safely
  const calculatedAmount = useMemo(() => {
    return amount > 0 ? amount : cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }, [amount, cartItems]);

  const handlePurchase = async (cartItems: CartItem[], totalAmount: number) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1];
  
      if (!token) {
        alert('You must be logged in to make a purchase');
        return;
      }
  
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
    price: totalAmount,
    iname:item.title
  })),
  totalAmount,
  name: formData.name,
  email: formData.email,          // <-- added
  address: formData.address,      // <-- added
  country: formData.country,
  zipcode : formData.zipCode ,
  phoneNumber: formData.phonenumber,// <-- added
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
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handlePayment = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Validate required fields
    if (!formData.name.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Valid email is required');
      setLoading(false);
      return;
    }

    try {
      const orderPayload = {
        amount: calculatedAmount,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name || item.productName || `Product ${item.id}`,
          price: item.price,
          quantity: item.quantity
        })),
        customer: formData,
        metadata: {
          orderDate: new Date().toISOString(),
          itemsCount: cartItems.length
        }
      };

      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      const data = await response.json();
      
      if (!data?.paymentUrl) {
        throw new Error('Invalid payment response');
      }

      sessionStorage.setItem('pendingOrder', JSON.stringify({
        ...orderPayload,
        paymentId: data.invoiceId
      }));

      window.location.href = data.paymentUrl;
    } catch (err: any) {
      console.error('Payment Error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [calculatedAmount, cartItems, formData]);

  const renderedCartItems = useMemo(() => {
    return cartItems.map(item => (
      <div key={item.id} className="py-3 flex justify-between">
        <div>
          <p className="font-medium text-gray-800">
            {item.name || item.productName || `Product ${item.id}`}
          </p>
          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
        </div>
        <p className="font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    ));
  }, [cartItems]);

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h3>
        {cartItems.length > 0 ? (
          <>
            <div className="divide-y divide-gray-200">
              {renderedCartItems}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculatedAmount.toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No items in cart</p>
        )}
      </div>

      {/* Customer Information Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Customer Information</h3>
        
        <div className="space-y-4">
          <InputField
            label="Full Name *"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
          
          <InputField
            label="Email Address *"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
          <InputField
            label="phone number *"
            id="phonenumber"
            name="phonenumber"
            type="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Country"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="United States"
            />

            <InputField 
              label="ZIP/Postal Code"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="10001"
            />
          </div>

          <InputField
            label="Street Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St"
          />

          <InputField
            label="City"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
          />
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={() => {
  handlePayment(); 
  handlePurchase(cartItems, amount); // No extra () => 
}}
        disabled={loading || cartItems.length === 0}
        className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
          loading || cartItems.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        {loading ? <Spinner /> : `Pay $${calculatedAmount.toFixed(2)} with Bitcoin`}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="font-medium">Payment Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

// Input Component
const InputField = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = ''
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      placeholder={placeholder}
    />
  </div>
);

// Spinner Component
const Spinner = () => (
  <span className="flex items-center justify-center">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  </span>
);