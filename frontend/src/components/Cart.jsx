import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getPrimaryProductImage } from '../utils/productImages';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItem(cartItemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-800">My Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4 text-gray-300">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-2">Add items to get started</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-flipkart-blue text-white rounded font-medium hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto">
              {cart.map((item) => {
                const imageUrl = getPrimaryProductImage(item.images, item.name);
                return (
                <div
                  key={item.id}
                  className="p-4 border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img
                        src={imageUrl || 'https://via.placeholder.com/100'}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-sm text-gray-800 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-flipkart-blue font-bold mt-2">
                          ₹{Math.floor(item.price)}
                        </p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 text-sm font-medium text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-red-600 text-sm font-medium transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            {/* Checkout Section */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0 space-y-3">
              {/* Price Summary */}
              <div className="space-y-2 pb-3 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">₹{Math.floor(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800">Total</span>
                <span className="text-flipkart-blue">₹{Math.floor(getTotalPrice())}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-flipkart-yellow text-flipkart-blue py-3 rounded font-bold text-lg hover:bg-yellow-500 transition duration-200"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={onClose}
                className="w-full bg-white text-gray-800 py-2 rounded border border-gray-300 font-medium hover:bg-gray-100 transition"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
