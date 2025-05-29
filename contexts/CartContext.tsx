'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  title: string;
  image: string;
  selectedAmount: number;
  quantity: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, amount: number) => void;
  updateQuantity: (id: string, amount: number, newQuantity: number) => void;
  clearCart: () => void;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'cartItems';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null;
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage', error);
      }
    }
  }, [cartItems, isInitialized]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.id === newItem.id && item.selectedAmount === newItem.selectedAmount
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id && item.selectedAmount === newItem.selectedAmount
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...newItem, quantity: 1 }];
    });

    toast({
      title: "Added to Cart!",
      description: `${newItem.title} - $${newItem.price.toFixed(2)} (${newItem.selectedAmount}) has been added to your cart.`,
    });
  };

  const removeFromCart = (id: string, amount: number) => {
    setCartItems(prev => prev.filter(
      item => !(item.id === id && item.selectedAmount === amount)
    ));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: string, amount: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id, amount);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.selectedAmount === amount
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isInitialized
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};