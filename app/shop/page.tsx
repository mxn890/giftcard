'use client'
import React, { useState } from 'react';
import Layout from '@/components/layout';
import GiftCard from '@/components/GiftCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { giftCardsData } from '@/data/giftCards';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { cartCount } = useCart();

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'streaming', name: 'Streaming' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'travel', name: 'Travel' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Beauty' }
  ];

  const filteredCards = giftCardsData.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-brand-dark-gray mb-4">Gift Card Shop</h1>
            <p className="text-gray-600 mb-6">
              Browse our complete collection of digital gift cards from top brands
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search gift cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-brand-purple focus:border-brand-purple focus:ring-brand-purple text-black"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 flex items-center justify-between gap-2 bg-purple-50 text-purple-800">
                    {selectedCategoryName}
                    <ChevronDown className="h-4 w-4 opacity-50 bg-white text-black" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white text-purple-900">
                  <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                    {categories.map((category) => (
                      <DropdownMenuRadioItem 
                        key={category.id} 
                        value={category.id}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white font-semibold">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredCards.length} gift cards
              {selectedCategory !== 'all' && ` in ${selectedCategoryName}`}
            </p>
            
            <div className="flex items-center gap-2 bg-slate-50 text-black">
              <Filter className="h-4 w-4 text-gray-500" />
              <select className="border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:border-brand-purple focus:ring-brand-purple">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Gift Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <GiftCard
                key={card.id}
                {...card}
              />
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No gift cards found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;