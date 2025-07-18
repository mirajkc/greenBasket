import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'


const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const { currency,user } = useAppContext()

  const fetchMyOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/user')
      if(data.success){
        setMyOrders(data.orders)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    if(user){
      fetchMyOrders()
    }
  }, [user])

  return (
    <div className="min-h-screen  pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="relative">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              My Orders
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg">Track and manage your recent purchases</p>
        </div>

        <div className="space-y-8">
          {myOrders.map((order, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 backdrop-blur-sm">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200/80">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Order ID:</span>
                      <span className="text-sm font-semibold text-gray-900 bg-gray-200 px-3 py-1 rounded-full">
                        {order._id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Payment:</span>
                      <span className="text-sm font-semibold text-gray-900 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {order.paymentType}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Total:</span>
                    <span className="text-xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">
                      {currency}{order.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="p-8 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="flex items-start gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="relative group">
                          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-2 shadow-sm ring-1 ring-gray-200/50">
                            <img 
                              src={item.product.image[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200" 
                            />
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                            {item.quantity || "1"}
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 bg-gray-100 inline-block px-3 py-1 rounded-full">
                              {item.product.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {currency}{(item.product.offerPrice * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {currency}{item.product.offerPrice} × {item.quantity || "1"}
                            </p>
                          </div>
                        </div>

                        {/* Order Metadata */}
                        <div className="flex flex-wrap items-center gap-6 mt-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <span className="text-sm font-semibold text-gray-900">{item.quantity || "1"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Date:</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {myOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Your order history will appear here once you make a purchase.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders