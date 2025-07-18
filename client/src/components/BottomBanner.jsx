import React from 'react';
import { assets } from '../assets/assets.js';
import { FaShippingFast, FaLeaf, FaTags, FaUserFriends } from 'react-icons/fa';

const BottomBanner = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-green-600 text-xl mt-1" />,
      title: "Lightning-Fast Service",
      description: "Groceries at your door within just 30 minutes.",
    },
    {
      icon: <FaLeaf className="text-green-600 text-xl mt-1" />,
      title: "Farm-Fresh Picks",
      description: "Picked daily to ensure the best quality and taste.",
    },
    {
      icon: <FaTags className="text-green-600 text-xl mt-1" />,
      title: "Unbeatable Offers",
      description: "Get more for less with our daily discounts.",
    },
    {
      icon: <FaUserFriends className="text-green-600 text-xl mt-1" />,
      title: "Trusted Community",
      description: "Serving over 15,000 happy households.",
    },
  ];

  return (
    <div className="relative w-full transition-transform duration-250 hover:scale-[1.005] hover:shadow-xl">
    <div className="relative w-full mt-16 md:mt-24">
      <div className="absolute z-10 md:hidden top-3 left-3 right-3 rounded-xl   p-4 space-y-3 ">
        <h2 className="text-lg sm:text-xl font-bold text-green-700">
          What Makes Us Stand Out?
        </h2>
        <div className="space-y-3">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              {item.icon}
              <div>
                <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                <p className="text-xs text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <img
        src={assets.bottom_banner_image}
        alt="bottom banner"
        className="w-full hidden md:block rounded-xl"
      />

      <img
        src={assets.bottom_banner_image_sm}
        alt="bottom banner"
        className="w-full md:hidden rounded-xl"
      />

      <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 hidden md:block text-white w-[80%] md:w-[40%] space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-green-600">
          What Makes Us Stand Out?
        </h2>
        <div className="space-y-3">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {item.icon}
              <div>
                <h3 className="text-base font-semibold text-black">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BottomBanner;
