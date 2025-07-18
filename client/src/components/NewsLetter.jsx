import React from "react"
import toast from 'react-hot-toast'

const NewsLetter = () => {
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
                        className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 bg-white border-0 outline-none text-base transition-all duration-200 "
                        type="email"
                        placeholder="Enter your email address"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-8 py-3 text-white bg-primary hover:bg-primary-dull font-semibold transition-all duration-75 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={() => toast.success("Thanks for suscribing. Please check email regularly  to get the latest offers, new arrivals, and exclusive discounts")}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
        </div>
    )
}

export default NewsLetter