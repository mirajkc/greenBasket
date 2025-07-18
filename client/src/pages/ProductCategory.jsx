import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets.js'
import ProductCard from '../components/ProductCard.jsx'

const ProductCategory = () => {
  const { products } = useAppContext()
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => (item.path.toLowerCase() === category)
  );

  const filterProducts = products.filter(
    (product) => (product.category.toLowerCase() === category)
  );

  return (
    <div className='mt-16'>
      {
        searchCategory && (
          <div className='flex flex-col items-end w-max'>
            <p className='text-2-xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
          </div>
        )
      }
      {filterProducts.length > 0 ?(
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-6 lg:px-8'>
          {filterProducts.map((product)=>(
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ):(
         <div className="w-full py-16 flex flex-col items-center justify-center text-center text-gray-500">
               <img 
                  src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
                alt="No product found" 
           className="w-20 h-20 mb-4 opacity-70"
    />
    <p className="text-lg font-medium">No Product Found</p>
    <p className="text-sm text-gray-400 mt-1">Please try another category or check back later.</p>
  </div>
      )}
    </div>
  )
}

export default ProductCategory
