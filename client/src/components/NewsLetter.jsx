import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const NewsLetter = () => {
  const [mail, setMail] = useState("");
  const [loading , setLoading] = useState(false)

  const sendMail = async () => {
    try {
      setLoading(true)
      if (!mail) return toast.error("Please enter your email!");

      const { data } = await axios.post("/api/user/sendMail", { emailaddress : mail });

      if (data.success) {
        toast.success(data.message || "Subscribed successfully!");
        setMail("");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 mt-24 pb-16 px-4">
      <div className="space-y-3">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 tracking-tight">
          Never Miss a Deal!
        </h1>
        <p className="md:text-xl text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox
        </p>
      </div>

      <div className="flex items-center justify-center max-w-md w-full mt-8">
        <div className="flex w-full shadow-lg rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-200">
          <input
            className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 bg-white border-0 outline-none text-base transition-all duration-200"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
          <button
  type="button"
  className="px-8 py-3 text-white bg-primary hover:bg-primary-dull font-semibold transition-all duration-75 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
  onClick={sendMail}
  disabled={loading}
>
  {loading && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )}
  {loading ? 'Subscribing...' : 'Subscribe'}
</button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
      </p>
    </div>
  );
};

export default NewsLetter;
