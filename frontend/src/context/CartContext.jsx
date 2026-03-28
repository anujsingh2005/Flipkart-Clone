import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user and load cart
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    const initializeUser = async () => {
      try {
        let currentUserId = null;

        // If user is authenticated, use their ID
        if (isAuthenticated && user?.id) {
          currentUserId = user.id;
          console.log('CartContext: Using authenticated user ID:', currentUserId);
        } else {
          // Otherwise, get default user
          const response = await axios.get('/api/users/default');
          currentUserId = response.data.id;
          console.log('CartContext: Using default user ID:', currentUserId);
        }

        setUserId(currentUserId);
        localStorage.setItem('userId', currentUserId);

        // Load user's cart
        const cartResponse = await axios.get(`/api/cart/${currentUserId}`);
        setCart(cartResponse.data);
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [authLoading, isAuthenticated, user?.id]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`/api/cart/${userId}`, { productId, quantity });

      // Reload cart to get updated data
      const cartResponse = await axios.get(`/api/cart/${userId}`);
      setCart(cartResponse.data);

      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (cartItemId, quantity) => {
    try {
      await axios.put(`/api/cart/${cartItemId}`, { quantity });

      // Reload cart
      const cartResponse = await axios.get(`/api/cart/${userId}`);
      setCart(cartResponse.data);
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`);

      // Reload cart
      const cartResponse = await axios.get(`/api/cart/${userId}`);
      setCart(cartResponse.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`/api/cart/user/${userId}`);
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cart,
    userId,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
