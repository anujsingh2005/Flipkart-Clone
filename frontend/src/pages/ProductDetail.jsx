import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageCarousel from '../components/ImageCarousel';
import { useCart } from '../context/CartContext';
import { normalizeProductImages } from '../utils/productImages';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, quantity);
      navigate('/checkout');
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing request');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

  const images = normalizeProductImages(product.images, product.name);

  return (
    <div className="min-h-screen bg-flipkart-lightgray py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-flipkart-blue mb-6 font-semibold hover:underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div>
            <ImageCarousel images={images} />
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-md border border-flipkart-lightgray">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded text-lg font-bold">
                {product.rating}★
              </span>
              <span className="text-sm text-gray-600">(125+ reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.original_price}
                    </span>
                    {discount > 0 && (
                      <span className="text-xl font-bold text-green-600">
                        {discount}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 font-semibold">
                (Inclusive of all taxes)
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded">
                  ✓ In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Delivery Info */}
            <div className="bg-flipkart-lightblue p-4 rounded-md mb-6 text-sm">
              <div className="mb-2">
                <p className="font-semibold">Delivery by Tomorrow</p>
                <p className="text-gray-600">FREE Delivery by Amazon</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-flipkart-lightgray rounded w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-12 text-center border-l border-r border-flipkart-lightgray py-2 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-flipkart-lightblue text-flipkart-blue py-3 rounded font-bold hover:bg-blue-100 disabled:opacity-50"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-flipkart-yellow text-gray-900 py-3 rounded font-bold hover:bg-yellow-500 disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-flipkart-lightgray pt-6">
              <h2 className="text-lg font-bold mb-3">Description</h2>
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Specifications</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <tr key={key} className="border-b border-flipkart-lightgray">
                            <td className="py-2 font-semibold text-gray-600 w-1/3">
                              {key}
                            </td>
                            <td className="py-2 text-gray-800">{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
