import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import navbar_logo from '../assets/navbar_logo.png';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import axios from "axios";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, setSearchQuery, searchQuery, cartItems, getCartCount } = useAppContext();
  const location = useLocation();

  const logout = async () => {
  try {
    const { data } = await axios.get('/api/user/logout');
    if (data.success) {
      toast.success(data.message);
      setUser(null);
      navigate('/home');
    } else {
      toast.error(data.message); // changed from toast.success
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Logout failed");
  }
};

  useEffect(() => { 
    if (searchQuery.length > 0) {
      navigate('/products');
    }
  }, [searchQuery]);

  if (location.pathname === '/' || location.pathname === '/seller') {
    return null;
  }

  return (
    <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 sm:px-8 lg:px-16 xl:px-32 py-3 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm relative transition-all duration-300">
        {/* Logo */}
        <NavLink to={'/'} className="flex items-center group" onClick={() => { setOpen(false) }}>
          <img
            src={navbar_logo}
            alt="Logo"
            className="h-11 w-auto group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {['/home', '/products', '/contact'].map((path, i) => {
            const labels = ['Home', 'Products', 'Contact Us'];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative font-medium text-sm transition-all duration-300 hover:text-primary ${
                    isActive ? 'text-primary after:w-full' : 'text-gray-700'
                  } after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </div>

        {/* Search Bar & Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden xl:flex items-center text-sm gap-3 border border-gray-300 px-4 py-2.5 rounded-full bg-gray-50/50 hover:bg-gray-50 focus-within:bg-white focus-within:border-primary transition-all duration-300 min-w-[280px]">
            <input
              className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700 text-sm"
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60" />
          </div>

          {/* Cart Icon */}
          <div
            onClick={() => { navigate('/cart') }}
            className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
          >
            <img src={assets.nav_cart_icon} alt="cart icon" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="absolute -top-1 -right-1 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-sm">
              {getCartCount()}
            </span>
          </div>

          {/* User Authentication */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2.5 bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-full font-medium text-sm shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <div className="p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 cursor-pointer">
                <img src={assets.profile_icon} alt="profile icon" className="w-8 h-8" />
              </div>
              <ul className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                <li
                  onClick={() => navigate('/my-orders')}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                >
                  My Orders
                </li>
                <li
                  onClick={() => navigate('/seller')}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                >
                  Sell Products
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 sm:hidden"> 
           <div
            onClick={() => { navigate('/cart') }}
            className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
          >
            <img src={assets.nav_cart_icon} alt="cart icon" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="absolute -top-1 -right-1 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-sm">
              {getCartCount()}
            </span>
          </div>
{/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
        >
          <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        </div>
        
        {/* Mobile Menu Overlay */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
            <div className="flex flex-col gap-1 px-6 py-4">
              {['/home', '/products', '/contact'].map((path, i) => {
                const labels = ['Home', 'All Products', 'Contact Us'];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                        isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    {labels[i]}
                  </NavLink>
                );
              })}
              {user && (
                <NavLink
                  to={'/my-orders'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  My Orders
                </NavLink>
              )}

              {/* Mobile Search */}
              <div className="flex items-center gap-3 border border-gray-300 px-4 py-2.5 rounded-full bg-gray-50/50 mt-2">
                <input
                  className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-700 text-sm"
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src={assets.search_icon} alt="search icon" className="w-4 h-4 opacity-60" />
              </div>

              {/* Mobile Auth Button */}
              {!user ? (
                <button
                  onClick={() => { setOpen(false); setShowUserLogin(true); }}
                  className="cursor-pointer px-6 py-3 mt-4 bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-full font-medium text-sm shadow-sm"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="cursor-pointer px-6 py-3 mt-4 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white rounded-full font-medium text-sm shadow-sm"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;