import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load wishlist when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadWishlist();
    } else {
      setWishlist([]);
      setWishlistIds(new Set());
    }
  }, [isAuthenticated, user?.id]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/wishlist/${user.id}`);
      setWishlist(response.data);
      const ids = new Set(response.data.map(item => item.product_id ?? item.id));
      setWishlistIds(ids);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to add to wishlist' };
    }

    try {
      await axios.post(`/api/wishlist/${user.id}`, { productId });
      await loadWishlist();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to add to wishlist'
      };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/wishlist/product/${productId}/user/${user.id}`);
      await loadWishlist();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to remove from wishlist'
      };
    }
  };

  const isInWishlist = (productId) => {
    return wishlistIds.has(productId);
  };

  const value = {
    wishlist,
    wishlistIds,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loadWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
