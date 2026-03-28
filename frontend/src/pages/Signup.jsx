import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await signup(formData.email, formData.password, formData.name);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Promo */}
      <div className="hidden lg:flex w-1/2 bg-flipkart-blue text-white flex-col justify-center px-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">Sign Up</h2>
            <p className="text-lg text-blue-100">Create your account and start shopping</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🛍️</div>
              <div>
                <h3 className="font-semibold text-lg">Browse & Shop</h3>
                <p className="text-blue-100 text-sm">Discover thousands of products</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">💝</div>
              <div>
                <h3 className="font-semibold text-lg">Save Favorites</h3>
                <p className="text-blue-100 text-sm">Create and manage your wishlist</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">🚚</div>
              <div>
                <h3 className="font-semibold text-lg">Easy Checkout</h3>
                <p className="text-blue-100 text-sm">Fast and secure payment process</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">📦</div>
              <div>
                <h3 className="font-semibold text-lg">Track Orders</h3>
                <p className="text-blue-100 text-sm">Stay updated on your deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-flipkart-blue">₹</h1>
            <h2 className="text-2xl font-bold text-gray-800">Flipkart</h2>
          </div>

          {/* Form Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Create Account</h3>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flipkart-blue focus:border-transparent text-gray-800"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flipkart-blue focus:border-transparent text-gray-800"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password (min 6 characters)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flipkart-blue focus:border-transparent text-gray-800"
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flipkart-blue focus:border-transparent text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-flipkart-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-lg mt-6"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-3">Already have an account?</p>
            <Link
              to="/login"
              className="w-full block py-3 border-2 border-flipkart-blue text-flipkart-blue rounded-lg font-semibold hover:bg-flipkart-lightblue transition duration-200"
            >
              Login
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our Terms of Use and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
