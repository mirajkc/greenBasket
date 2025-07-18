import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import ProductCard from '../components/ProductCard.jsx'; // Make sure you have this component

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
  if (searchQuery.length > 0) {
    setFilterProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  } else {
    setFilterProducts(products);
  }
}, [products, searchQuery]);


  return (
    <div className='mt-16 flex flex-col'>
      {/* Header */}
      <div className='flex flex-col items-start'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full mt-1'></div>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8'>
        {filterProducts
          .filter(product => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
