'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import { useRouter } from 'next/navigation';

interface PurchaseItem {
  productId: string;
  quantity: number;
  price: number;
  iname: string;
  _key: string;
}

interface Purchase {
  _id: string;
  userId: string;
  name: string;
  email: string;
  address?: string;
  country?: string;
  zipcode?: string;
  phoneNumber: string;
  totalAmount: number;
  purchaseDate: string;
  items: PurchaseItem[];
  iname:string;
}

const client = createClient({
  projectId: 't2m9ot8z',
  dataset: 'production',
  apiVersion: '2025-06-06',
  useCdn: false,
});

const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
};

export default function AdminPurchases() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchPurchases();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPurchases = () => {
    const query = `*[_type == "purchase"] | order(purchaseDate desc) {
      _id,
      userId,
      name,
      email,
      address,
      country,
      zipcode,
      phoneNumber,
      totalAmount,
      purchaseDate,
      items[] {
        productId,
        quantity,
        price,
        iname,
        _key
      }
    }`;

    client.fetch(query)
      .then((data: Purchase[]) => {
        setPurchases(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      fetchPurchases();
    } else {
      setAuthError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setEmail('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
          </div>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-center">
              {authError}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Order Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <p className="mt-1 text-sm text-gray-500">
              {purchases.length} {purchases.length === 1 ? 'order' : 'orders'} found
            </p>
          </div>
          
          {purchases.length === 0 ? (
            <div className="p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">When customers place orders, they'll appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchases.map((purchase) => (
                    <tr key={purchase._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(purchase.purchaseDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{purchase.name}</div>
                        <div className="text-sm text-gray-500">{purchase.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{purchase.phoneNumber}</div>
                        {purchase.address && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{purchase.address}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-sm font-semibold rounded-full bg-green-100 text-green-800">
                          ${purchase.totalAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {purchase.items.map((item) => (
                            <span key={item._key} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {item.quantity}x (${item.price})
                              <div className="text-sm text-gray-500 truncate max-w-xs">{item.iname}</div>
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}