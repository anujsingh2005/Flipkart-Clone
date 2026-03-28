import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { getPrimaryProductImage } from '../utils/productImages';

const ProductCard = ({ product, onAddToCart, onProductClick }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));
  const [imageError, setImageError] = useState(false);

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const imageUrl = getPrimaryProductImage(product.images, product.name);

  const handleImageError = () => {
    console.error('Failed to load image:', imageUrl);
    setImageError(true);
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please login to add to wishlist');
      return;
    }

    if (isWishlisted) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }

    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      onClick={onProductClick}
      className="bg-white border border-flipkart-lightgray rounded-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-gray-400"
    >
      {/* Product Image Container */}
      <div className="relative w-full h-64 bg-gray-50 overflow-hidden group flex items-center justify-center">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-4xl text-gray-400">{product.name[0]}</span>
          </div>
        ) : (
          <img
            src={imageUrl || 'https://via.placeholder.com/200/cccccc/999999?text=No+Image'}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-flipkart-yellow text-gray-800 px-2 py-1 rounded text-xs font-bold">
            {discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md hover:scale-110 transition-transform duration-200 flex items-center justify-center"
        >
          <span className="text-lg">{isWishlisted ? '❤️' : '🤍'}</span>
        </button>

        {/* Stock Status Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 space-y-2">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-9 leading-4">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded font-semibold">
            {product.rating}★
          </span>
          <span className="text-xs text-gray-600">(125)</span>
        </div>

        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{Math.floor(product.price)}
            </span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{Math.floor(product.original_price)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="text-xs font-semibold">
          {product.stock > 0 ? (
            <span className="text-green-600">✓ In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
          disabled={product.stock === 0}
          className="w-full mt-3 bg-flipkart-yellow text-flipkart-blue py-2 rounded font-bold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
