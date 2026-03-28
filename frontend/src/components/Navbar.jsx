import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ openCart }) => {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [profileOpen, setProfileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-flipkart-blue text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Main Navbar */}
        <div className="flex items-center justify-between gap-4 mb-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 flex-shrink-0 hover:opacity-90 transition">
            <span className="text-3xl font-bold">₹</span>
            <div>
              <div className="text-xl font-bold leading-tight">Flipkart</div>
              <div className="text-xs font-light text-blue-100">Explore Plus</div>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 mx-6 hidden sm:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Right Section - Auth & Cart */}
          <div className="flex items-center gap-4">
            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-600 transition text-sm sm:text-base">
                  <span className="text-lg">👤</span>
                  <span className="font-medium hidden sm:inline truncate max-w-32">{user?.name || 'Account'}</span>
                  <span className="text-xs">▼</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-0 w-56 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                  <div className="px-4 py-4 bg-gray-50 border-b">
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>

                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700"
                  >
                    <span className="text-lg">📦</span>
                    <div>
                      <p className="font-medium">My Orders</p>
                      <p className="text-xs text-gray-600">Track your purchases</p>
                    </div>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-gray-700 border-b"
                  >
                    <span className="text-lg">💝</span>
                    <div>
                      <p className="font-medium">My Wishlist</p>
                      <p className="text-xs text-gray-600">Save your favorites</p>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition text-gray-700 font-medium"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded font-semibold hover:bg-blue-600 transition text-sm sm:text-base"
              >
                Login
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition text-sm sm:text-base font-semibold"
            >
              <span className="text-xl">🛒</span>
              <div className="text-right hidden sm:block">
                <div className="text-xs text-blue-100">Cart</div>
                <div className="font-semibold">{cart.length}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none placeholder-gray-600"
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-400">
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
