import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { getPrimaryProductImage } from '../utils/productImages';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user/${user?.id}`);
        setOrders(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Processing',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl text-gray-300 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 0120.354 15.354z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-2">View and track your orders</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-5xl text-gray-300 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium">No orders yet</p>
            <p className="text-gray-500 text-sm mt-2">Start shopping to see your orders here</p>
          </div>
        ) : selectedOrder ? (
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-flipkart-blue hover:text-blue-700 font-medium mb-6 flex items-center gap-2"
            >
              Back to Orders
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Order #{selectedOrder.id}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Order Date</p>
                      <p className="text-gray-800 font-medium">{formatDate(selectedOrder.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.order_items?.map((item) => {
                      const imageUrl = getPrimaryProductImage(item.images, item.product_name || 'Product');

                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            {imageUrl && (
                              <img
                                src={imageUrl}
                                alt={item.product_name || 'Product'}
                                className="h-16 w-16 rounded border border-gray-200 bg-white object-contain"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">{item.product_name || 'Product'}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-800">Rs.{Math.floor(item.price_at_purchase)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-3">Shipping Address</h3>
                  {selectedOrder.shipping_address && (
                    <div className="text-sm text-gray-700 space-y-1">
                      <p className="font-medium">
                        {selectedOrder.shipping_address.firstName && selectedOrder.shipping_address.lastName
                          ? `${selectedOrder.shipping_address.firstName} ${selectedOrder.shipping_address.lastName}`
                          : selectedOrder.shipping_address.fullName || 'N/A'}
                      </p>
                      <p>{selectedOrder.shipping_address.address}</p>
                      <p>
                        {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.pincode}
                      </p>
                      <p className="pt-2 font-medium">
                        {selectedOrder.shipping_address.phoneNumber || selectedOrder.shipping_address.phone || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs.{Math.floor(selectedOrder.total_amount)}</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
                      <span className="text-gray-800">Total</span>
                      <span className="text-flipkart-blue">Rs.{Math.floor(selectedOrder.total_amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white rounded-lg shadow p-4 md:p-6 cursor-pointer hover:shadow-lg transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Order ID</p>
                    <p className="text-lg font-bold text-flipkart-blue">#{order.id}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm font-medium">Date</p>
                    <p className="text-gray-800 font-medium">{formatDate(order.created_at)}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm font-medium">Amount</p>
                    <p className="text-lg font-bold text-flipkart-blue">Rs.{Math.floor(order.total_amount)}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm font-medium">Items</p>
                    <p className="text-gray-800 font-medium">{order.order_items?.length || 0} item(s)</p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
