import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getPrimaryProductImage } from '../utils/productImages';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (product) => {
    await addToCart(product.id, 1);
    await removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-5xl mb-4"></div>
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
            <p className="text-gray-500 text-sm mt-2">Start adding products to your wishlist</p>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-2 bg-flipkart-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist ({wishlist.length})</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => {
            const imageUrl = getPrimaryProductImage(product.images, product.name);

            return (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              {/* Product Image */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              {/* Product Info */}
              <h3 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>

              {/* Price */}
              <div className="mb-3">
                <p className="text-flipkart-blue font-bold text-lg">
                  ₹{parseFloat(product.price).toFixed(0)}
                </p>
                {product.original_price && (
                  <p className="text-gray-500 line-through text-sm">
                    ₹{parseFloat(product.original_price).toFixed(0)}
                  </p>
                )}
              </div>

              {/* Rating */}
              {product.rating && (
                <p className="text-sm text-gray-600 mb-3">⭐ {product.rating}</p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-flipkart-blue text-white py-2 rounded font-semibold hover:bg-blue-700 transition text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="flex-1 bg-red-100 text-red-700 py-2 rounded font-semibold hover:bg-red-200 transition text-sm"
                >
                  Remove
                </button>
              </div>

              {/* View Details */}
              <Link
                to={`/product/${product.id}`}
                className="block text-center mt-2 text-flipkart-blue hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
}
