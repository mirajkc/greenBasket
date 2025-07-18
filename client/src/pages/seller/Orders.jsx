import React, { useEffect, useState } from "react";
import { useAppContext } from '../../context/AppContext.jsx'
import { useSearchParams } from "react-router-dom";
import { assets, dummyOrders } from "../../assets/assets.js";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/seller')
      if(data.success){
        setOrders(data.orders)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Orders List
        </h1>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Order Items Section */}
                <div className="lg:col-span-1">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded"
                      >
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.product.name} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address Section */}
                <div className="lg:col-span-1">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Delivery Address</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium text-gray-900 mb-2">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.address.street}, {order.address.city}</p>
                      <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                      <p className="text-primary font-medium pt-2">
                        {order.address.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-1">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Order Details</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-xl font-semibold text-primary mb-3">
                      {currency}{order.amount}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Method:</span> {order.paymentType}
                      </p>
                     <p className="text-gray-600 text-sm">
  <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
</p>

                      
                      <div className="pt-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            order.isPaid
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;