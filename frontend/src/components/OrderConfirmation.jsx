import React from 'react';
import { Link } from 'react-router-dom';
import { getPrimaryProductImage } from '../utils/productImages';

const OrderConfirmation = ({ order }) => {
  if (!order) {
    return (
      <div className="text-center py-20">
        <p>No order found</p>
      </div>
    );
  }

  const getDeliveryDate = () => {
    const date = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const shippingAddress = order.shipping_address || {};
  const fullName = shippingAddress.firstName && shippingAddress.lastName
    ? `${shippingAddress.firstName} ${shippingAddress.lastName}`
    : shippingAddress.fullName || 'N/A';
  const phone = shippingAddress.phoneNumber || shippingAddress.phone || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border-l-4 border-green-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully</h1>
              <p className="text-gray-600 mt-1">Thank you for shopping. Your order has been confirmed and will be shipped soon.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-3xl font-bold text-flipkart-blue">#{order.id}</p>
              <p className="text-xs text-gray-500 mt-3">
                Order placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="divide-y divide-gray-200">
                {order.items && order.items.map((item, index) => {
                  const imageUrl = getPrimaryProductImage(item.images, item.name);

                  return (
                    <div key={index} className="py-4 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="h-16 w-16 rounded border border-gray-200 bg-gray-50 object-contain"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        Rs.{Math.floor(item.price_at_purchase * item.quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">{fullName}</p>
                <p className="text-gray-700 mt-2">{shippingAddress.address}</p>
                <p className="text-gray-700">
                  {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                </p>
                <p className="text-gray-700 mt-2 font-medium">{phone}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">Rs.{Math.floor(order.total_amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-flipkart-blue">Rs.{Math.floor(order.total_amount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-flipkart-yellow">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-flipkart-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9-4v4m4-4v4" />
                </svg>
                <h3 className="font-bold text-gray-900">Delivery</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Expected Delivery Date</p>
              <p className="text-xl font-bold text-gray-900">{getDeliveryDate()}</p>
              <p className="text-xs text-gray-500 mt-2">3-5 business days delivery</p>
            </div>

            <Link
              to="/orders"
              className="block w-full bg-flipkart-blue text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition mb-3"
            >
              Track Order
            </Link>

            <Link
              to="/"
              className="block w-full bg-white text-flipkart-blue border-2 border-flipkart-blue text-center py-3 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Safe & Secure:</span> We use SSL encryption to keep your information secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
