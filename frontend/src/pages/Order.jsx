import React from 'react';
import axios from 'axios';
import Checkout from '../components/Checkout';
import OrderConfirmation from '../components/OrderConfirmation';
import { useCart } from '../context/CartContext';

const Order = () => {
  const { cart, userId, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [currentOrder, setCurrentOrder] = React.useState(null);

  const handlePlaceOrder = async (shippingAddress) => {
    try {
      console.log('Placing order with userId:', userId);

      const items = cart.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await axios.post('/api/orders', {
        userId,
        items,
        shippingAddress,
        totalAmount: getTotalPrice(),
      });

      setCurrentOrder(response.data.order);
      await clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-flipkart-lightgray py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <OrderConfirmation order={currentOrder} />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-flipkart-lightgray py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flipkart-lightgray py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <Checkout
          cartItems={cart}
          totalAmount={getTotalPrice()}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default Order;
