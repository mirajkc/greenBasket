import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative w-full transition-transform duration-250 hover:scale-[1.005] hover:shadow-xl">
      <img
        src={assets.main_banner_bg}
        alt="GreenBasket Banner"
        className="hidden md:block w-full h-auto object-cover"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="GreenBasket Mobile Banner"
        className="block md:hidden w-full h-auto object-cover"
      />
       
      <div className="absolute inset-0 flex items-end md:items-center bg-black/0">
        <div className="w-full px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-10 md:pb-0">
          <div className="max-w-xl space-y-4 animate-fade-in">
            <h1 className="text-slate-800 text-2xl md:text-4xl font-extrabold leading-snug animate-slide-up">
              Groceries That Shine,<br />Prices That Feel Fine!
            </h1>
             
            <p className="text-slate-700 text-sm md:text-base animate-slide-up-delay">
              Order your groceries online with GreenBasket and enjoy fast delivery, great deals, and top-quality produce every day.
            </p>
             
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 animate-slide-up-delay-2">
              <Link
                to="/products"
                className="group bg-[#308038] hover:bg-[#25692e] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                <span>Shop Now</span>
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
               
              <Link
                to="/products"
                className="group text-slate-800 hover:text-slate-900 font-medium flex items-center justify-center gap-1 transition-all duration-300  px-6 py-3 rounded-md"
              >
                <span>Explore deals</span>
                <img 
                  src={assets.black_arrow_icon} 
                  alt="" 
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;