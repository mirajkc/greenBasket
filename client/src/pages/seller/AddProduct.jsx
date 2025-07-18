import React, { useState } from 'react';
import { categories } from '../../assets/assets.js';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', JSON.stringify(description.split('\n')));
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);

      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          formData.append('images', files[i]);
        }
      }

      const { data } = await axios.post('/api/product/add', formData);

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  const resetForm = () => {
    setFiles([]);
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setOfferPrice('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
            <p className="text-gray-600">
              Fill in the details below to add a new product to your store
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <form onSubmit={onSubmitHandler} className="space-y-8">
                {/* Product Images */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array(4)
                      .fill('')
                      .map((_, index) => (
                        <label key={index} htmlFor={`image${index}`} className="block">
                          <input
                            onChange={(e) => {
                              const updatedFiles = [...files];
                              updatedFiles[index] = e.target.files[0];
                              setFiles(updatedFiles);
                            }}
                            accept="image/*"
                            type="file"
                            id={`image${index}`}
                            hidden
                          />
                          <div className="aspect-square border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-primary-50 hover:border-primary-400 transition-all duration-200 cursor-pointer hover:shadow-md overflow-hidden">
                            {files[index] ? (
                              <img
                                src={URL.createObjectURL(files[index])}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-primary-500">
                                <svg
                                  className="w-8 h-8 mb-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm font-medium">Add Image</span>
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="product-name"
                        className="text-sm font-semibold text-gray-700 mb-2 block"
                      >
                        Product Name
                      </label>
                      <input
                        id="product-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter product name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="text-sm font-semibold text-gray-700 mb-2 block"
                      >
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        id="category"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                          <option key={index} value={item.path}>
                            {item.path}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="product-price"
                          className="text-sm font-semibold text-gray-700 mb-2 block"
                        >
                          Product Price
                        </label>
                        <input
                          id="product-price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          min="1"
                          placeholder="0.00"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="offer-price"
                          className="text-sm font-semibold text-gray-700 mb-2 block"
                        >
                          Offer Price
                        </label>
                        <input
                          id="offer-price"
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          type="number"
                          min="0"
                          placeholder="0.00"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="product-description"
                      className="text-sm font-semibold text-gray-700 mb-2 block"
                    >
                      Product Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="product-description"
                      rows={10}
                      placeholder="Describe your product in detail..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-200 gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-3 bg-red-400 hover:bg-red-500 text-gray-800 font-semibold rounded-lg shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 outline-none"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-primary hover:bg-primary-dull text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 outline-none"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
