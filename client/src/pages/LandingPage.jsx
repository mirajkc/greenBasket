import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import round_logo from '../assets/round_logo.png';
import search from '../assets/search.png';
import { useAppContext } from '../context/AppContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-emerald-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-center">
        {/* Hero Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="mb-8 hover:scale-105 transition-transform duration-200">
            <img 
              src={round_logo} 
              alt="GreenBasket Logo" 
              className="w-24 h-20 sm:w-32 sm:h-32 mx-auto drop-shadow-lg"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
            <span className="relative inline-block">
              Welcome to 
              <span className="text-green-600 ml-3 relative">
                GreenBasket
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              </span>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-light text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Fresh groceries delivered to your doorstep with 
            <span className="text-green-600 font-medium"> love and care</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base text-gray-500 mb-12">
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Same-day delivery
            </span>
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Fresh & organic
            </span>
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Best prices
            </span>
          </div>
        </div>
        {/* CTA Section */}
        <div className="mb-16">
          <Link to="/home">
            <button onClick={() => scrollTo(0, 0)} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-12 text-lg rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl uppercase tracking-wide">
              Start Shopping Now
              <span className="ml-2">→</span>
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto w-full px-4">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-3xl mb-4">🥦</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fresh Produce</h3>
            <p className="text-gray-600 text-sm">Locally sourced fruits and vegetables, picked fresh daily</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Same-day and next-day delivery options available</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-3xl mb-4">💸</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Prices</h3>
            <p className="text-gray-600 text-sm">Competitive prices with exclusive deals and offers</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-3xl mb-4">♻️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
            <p className="text-gray-600 text-sm">Sustainable packaging and environmentally conscious practices</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Safe and secure payment options with order tracking</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-3xl mb-4">🧾</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparent Billing</h3>
            <p className="text-gray-600 text-sm">No hidden charges, clear pricing with detailed invoices</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100 text-left w-full">
          
          {/* About Section */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              About <span className="text-green-600">GreenBasket</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-700">
              At <strong className="text-green-600 font-semibold">GreenBasket</strong>, we bring the grocery store to your doorstep. 
              Our mission is to make your daily shopping easy, fast, and affordable while supporting local farmers and promoting sustainable choices.
            </p>
            
            <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-700">
              Choose from our hand-picked selection of fresh fruits, vegetables, dairy, bakery items, organic goods, snacks, and household essentials. 
              Our team ensures that every item meets the highest standards of quality and freshness.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <h3 className="font-semibold text-gray-800">Browse</h3>
                </div>
                <p className="text-gray-700 text-sm">Explore categories or use our smart search to find what you need.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <h3 className="font-semibold text-gray-800">Add to Cart</h3>
                </div>
                <p className="text-gray-700 text-sm">Pick your items and add them to your basket in just a click.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  <h3 className="font-semibold text-gray-800">Checkout</h3>
                </div>
                <p className="text-gray-700 text-sm">Choose delivery time, enter your address, and pay securely.</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  <h3 className="font-semibold text-gray-800">Relax</h3>
                </div>
                <p className="text-gray-700 text-sm">Sit back while we deliver your groceries fresh and on time.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              Why Choose GreenBasket?
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 mb-6">
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                We understand the importance of health, time, and trust when it comes to grocery shopping. 
                Here's why thousands of customers choose GreenBasket every day:
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Curated products with quality assurance",
                "Partnered with local farms and producers", 
                "Customer-first return and refund policy",
                "24/7 support and live order tracking",
                "Built with love by a local team for local needs"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-200">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-base sm:text-lg mb-6 text-green-100">
              Join thousands of satisfied customers who trust <strong>GreenBasket</strong> for their daily grocery needs.
            </p>
            <Link to="/home">
              <button onClick={() => scrollTo(0, 0)} className="bg-white text-green-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md">
                Start Shopping Today
              </button>
            </Link>
          </div>
          
          <div className="mt-12 text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl">
  <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Grow Your Business?</h3>
  <p className="text-base sm:text-lg mb-6 text-green-100">
    Join <strong>GreenBasket</strong> as a seller and showcase your products to thousands of daily customers across Nepal.
  </p>
  <Link to="/seller">
    <button
      onClick={() => scrollTo(0, 0)}
      className="bg-white text-green-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md"
    >
      Start Selling with GreenBasket
    </button>
  </Link>
</div>

        </div>
      </main>
    </div>
  );
};

export default LandingPage;
