import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('demo@flipkart.com');
  const [password, setPassword] = useState('demo123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

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
            <h2 className="text-4xl font-bold mb-4">Login</h2>
            <p className="text-lg text-blue-100">Get access to your Orders, Wishlist and Recommendations</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-lg">View Your Orders</h3>
                <p className="text-blue-100 text-sm">Track your purchases and delivery status</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">❤️</div>
              <div>
                <h3 className="font-semibold text-lg">Save to Wishlist</h3>
                <p className="text-blue-100 text-sm">Never miss out on your favorite products</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="font-semibold text-lg">Faster Checkout</h3>
                <p className="text-blue-100 text-sm">Saved address for quicker purchases</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-16 pt-8 border-t border-blue-300">
          <p className="text-sm text-blue-100 mb-3">Demo Account:</p>
          <div className="bg-blue-600 bg-opacity-50 rounded-lg p-4 space-y-2">
            <p className="text-sm"><span className="font-semibold">Email:</span> demo@flipkart.com</p>
            <p className="text-sm"><span className="font-semibold">Password:</span> demo123456</p>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Your Email or Mobile</h3>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flipkart-blue focus:border-transparent text-gray-800"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-flipkart-blue focus:border-transparent text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-flipkart-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-lg"
            >
              {loading ? 'Logging in...' : 'Continue'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-3">New to Flipkart Clone?</p>
            <Link
              to="/signup"
              className="w-full block py-3 border-2 border-flipkart-blue text-flipkart-blue rounded-lg font-semibold hover:bg-flipkart-lightblue transition duration-200"
            >
              Create your account
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Use and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
