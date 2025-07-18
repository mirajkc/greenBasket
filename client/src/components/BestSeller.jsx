import React from 'react'
import ProductCard from './ProductCard.jsx'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-6 lg:px-8">
        {products.filter((product) => product.inStock).slice(0, 10).map((product, index) => (
          <ProductCard key={product._id || index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller;