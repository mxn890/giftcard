'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/contexts/CartContext'
import { giftCardsData } from '@/data/giftCards'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { cartCount } = useCart()
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim()) {
      const results = giftCardsData.filter(card =>
        card.title.toLowerCase().includes(term.toLowerCase()) ||
        card.description.toLowerCase().includes(term.toLowerCase()) ||
        card.category.toLowerCase().includes(term.toLowerCase())
      )
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  const handleSearchResultClick = (cardId: string) => {
    router.push(`/product/${cardId}`)
    setShowSearchResults(false)
    setSearchTerm('')
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Animation */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md"
            >
              <motion.span 
                className="text-white font-bold text-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Z
              </motion.span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ZakGifts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors font-bold">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-purple-600 transition-colors font-bold">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-bold">
              About
            </Link>
          </div>

          {/* Search Bar with Animation */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search gift cards..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchTerm && setShowSearchResults(true)}
                className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300 text-black"
              />

              {/* Animated Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
                  >
                    {searchResults.map((card) => (
                      <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => handleSearchResultClick(card.id)}
                        className="p-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{card.title}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                                {card.category}
                              </span>
                              <span className="ml-2">${card.price}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart with Animation */}
            <Link href="/cart" className="relative text-black">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2 text-black">
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </motion.div>
              </Link>
              <Link href="/create-account">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md" size="sm">
                    Create Account
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-purple-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-gray-200 text-black">
                {/* Mobile Search */}
                <div className="relative mb-4 " ref={mobileSearchRef}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-800 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search gift cards..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchTerm && setShowSearchResults(true)}
                    className="pl-10"
                  />

                  {/* Mobile Search Results */}
                  <AnimatePresence>
                    {showSearchResults && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
                      >
                        {searchResults.map((card) => (
                          <motion.div
                            key={card.id}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handleSearchResultClick(card.id)}
                            className="p-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={card.image}
                                alt={card.title}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                              <div>
                                <div className="font-medium text-gray-800">{card.title}</div>
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                                    {card.category}
                                  </span>
                                  <span className="ml-2">${card.price}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col space-y-3">
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/shop" 
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex space-x-3 pt-4 text-black">
                  <Link href="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/create-account" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full shadow-md" size="sm">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar