'use client'
import React, { useEffect, useState } from 'react'
import { FiShoppingBag, FiLoader, FiDollarSign, FiCalendar, FiPackage, FiLogOut, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface PurchaseItem {
  productId: string
  iname: string
  quantity: number
  price: number

  image?: string
}

interface Purchase {
  _id: string
  items: PurchaseItem[]
  totalAmount: number
  purchaseDate: string
  status?: 'completed' | 'processing' | 'cancelled'
}

export default function PurchasesPage() {
  const router = useRouter()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedPurchase, setExpandedPurchase] = useState<string | null>(null)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch('/api/purchase', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          throw new Error(res.status === 401 ? 'Please login to view purchases' : 'Failed to fetch purchases')
        }

        const data: Purchase[] = await res.json()
        setPurchases(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
  }, [])

  const togglePurchase = (id: string) => {
    setExpandedPurchase(expandedPurchase === id ? null : id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (res.ok) {
        router.push('/login')
      } else {
        console.error('Logout failed')
      }
    } catch (err) {
      console.error('Error during logout:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-purple-50 to-white">
        <FiLoader className="animate-spin h-12 w-12 text-purple-900 mb-4" />
        <p className="text-lg text-gray-700">Loading your purchases...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-purple-50 to-white px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-red-200 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Purchases</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
            >
              Try Again
            </button>
            {error.includes('login') && (
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 border border-purple-900 text-purple-900 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-purple-50 to-white px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag className="h-8 w-8 text-purple-900" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Purchases Found</h2>
          <p className="text-gray-600 mb-6">You haven't made any purchases yet.</p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-lg hover:from-purple-800 hover:to-indigo-800 transition-colors font-medium shadow-md"
            >
              Browse Products
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 flex items-center justify-center space-x-2 text-purple-900 rounded-lg border border-purple-900 hover:bg-purple-50 transition-colors font-medium"
            >
              <FiLogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-purple-900 sm:text-4xl">
              Your Purchase History
            </h1>
            <p className="mt-3 text-xl text-gray-600">
              All your orders in one place
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="bg-purple-100 p-2 rounded-full">
                <FiUser className="h-5 w-5 text-purple-900" />
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                My Account
              </span>
              {showUserDropdown ? (
                <FiChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <FiChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {purchases.map((purchase) => (
            <motion.div
              key={purchase._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => togglePurchase(purchase._id)}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <FiShoppingBag className="h-6 w-6 text-purple-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{purchase._id.slice(-8).toUpperCase()}
                      </h3>
                      <div className="flex items-center mt-1">
                        <FiCalendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-500">
                          {new Date(purchase.purchaseDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="flex items-center">
                      <FiDollarSign className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="text-xl font-bold text-purple-900">
                        ${purchase.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    {purchase.status && (
                      <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {expandedPurchase === purchase._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 px-6 py-4 bg-gray-50"
                >
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <FiPackage className="mr-2 text-purple-900" />
                    Purchased Items ({purchase.items.length})
                  </h4>
                  <div className="space-y-4">
                    {purchase.items.map((item, idx) => (
                      <div key={idx} className="flex items-start py-3 border-b border-gray-200 last:border-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.iname} 
                            className="w-16 h-16 rounded-md object-cover mr-4 border border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center mr-4 border border-gray-200">
                            <FiPackage className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.iname || `Product ${item.productId}`}</h5>
                          <p className="text-sm text-gray-500">SKU: {item.productId}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}