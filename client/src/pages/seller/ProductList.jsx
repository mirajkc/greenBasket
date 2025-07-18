import React from "react";
import { useAppContext } from '../../context/AppContext.jsx';
import axios from "axios";
import toast from 'react-hot-toast';

const ProductList = () => {
  const { products, currency, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/api/product/stock', { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Products</h2>
            <p className="text-gray-600">Manage your product inventory and stock status</p>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider hidden md:table-cell">Selling Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">In Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                              <img 
                                src={product.image[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate max-sm:hidden">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 border border-primary-200">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold hidden md:table-cell">
                        {currency}{product.offerPrice}
                      </td>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input 
                            type="checkbox" 
                            onClick={() => toggleStock(product._id, !product.inStock)} 
                            checked={product.inStock} 
                            className="sr-only peer"  
                          />
                          <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
            <p>Showing {products.length} product{products.length !== 1 ? 's' : ''}</p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-colors duration-200 font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
