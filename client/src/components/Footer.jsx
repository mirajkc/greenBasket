import React from "react";
 import { useLocation, Link } from "react-router-dom";
// import logo from "../assets/navbar_logo.png";

const Footer = () => {
   const location = useLocation();
   if (location.pathname === "/seller") {
     return null;
   }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-green-50 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div className="animate-in slide-in-from-left-6 duration-700 delay-200">
          <div className="w-34 md:w-32 h-16 bg-primary/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-out">
            <span className="text-primary font-bold text-lg">GreenBasket</span>
          </div>
          <p className="max-w-[410px] mt-6 animate-in fade-in duration-700 delay-300">
            Your one-stop shop for fresh groceries and daily snacks. With GreenBasket, enjoy convenience, quality, and savings—delivered.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {/* Quick Links */}
          <div className="animate-in slide-in-from-right-6 duration-700 delay-100">
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 hover:text-primary transition-colors duration-300">
              Quick Links
            </h3>
            <ul className="text-sm space-y-1">
              <li className="animate-in fade-in duration-500 delay-400">
                <a 
                  href="/home" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-500">
                <a 
                  href="/contact" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <a 
                  href="/contact" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  FAQs
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <Link 
                  to="/seller" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Sell Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help? */}
          <div className="animate-in slide-in-from-right-6 duration-700 delay-200">
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 hover:text-primary transition-colors duration-300">
              Need Help?
            </h3>
            <ul className="text-sm space-y-1">
              <li className="animate-in fade-in duration-500 delay-400">
                <a 
                  href="/my-orders" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Delivery Information
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-500">
                <a 
                  href="/contact" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Return & Refund Policy
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <a 
                  href="/contact" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Payment Methods
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-700">
                <a 
                  href="/my-orders" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Track your Order
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-800">
                <a 
                  href="/contact" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="animate-in slide-in-from-right-6 duration-700 delay-300">
            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 hover:text-primary transition-colors duration-300">
              Follow Us
            </h3>
            <ul className="text-sm space-y-1">
              <li className="animate-in fade-in duration-500 delay-400">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  Instagram
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-500">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  Twitter
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-600">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  Facebook
                </a>
              </li>
              <li className="animate-in fade-in duration-500 delay-700">
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block hover:scale-105"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80 animate-in fade-in duration-700 delay-900">
        Copyright 2025 © GreenBasket. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;