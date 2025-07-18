import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { useParams, Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import ProductCard from '../components/ProductCard.jsx'

const ProductDetail = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    
    const product = products.find((items) => items._id === id);

    useEffect(() => {
        if (products.length > 0 && product) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category);
            setRelatedProducts(productsCopy.slice(0, 10));
        }
    }, [products, product]);

    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null);
    }, [product]);

    return product && (
        <div className="mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8">
                <p className="text-sm text-gray-600 flex items-center space-x-2">
                    <Link to='/home' className="text-primary hover:text-primary-dull font-medium transition-colors duration-200">
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link to='/products' className="text-primary hover:text-primary-dull font-medium transition-colors duration-200">
                        Products
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link to={`/products/${product.category.toLowerCase()}`} className="text-primary hover:text-primary-dull font-medium transition-colors duration-200">
                        {product.category}
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-800 font-medium">{product.name}</span>
                </p>
            </nav>

            {/* Product Details Section */}
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 mt-8">
                {/* Product Images */}
                <div className="flex gap-4 lg:w-1/2">
                    {/* Thumbnail Images */}
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => setThumbnail(image)} 
                                className={`border-2 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:border-primary-dull ${
                                    thumbnail === image ? 'border-primary shadow-md' : 'border-gray-200'
                                }`}
                            >
                                <img 
                                    src={image} 
                                    alt={`Thumbnail ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Product Image */}
                    <div className="border-2 border-gray-200 flex-1 max-w-md rounded-lg overflow-hidden shadow-sm">
                        <img 
                            src={thumbnail} 
                            alt="Selected product" 
                            className="w-full h-full object-cover aspect-square"
                        />
                    </div>
                </div>

                {/* Product Information */}
                <div className="flex-1 lg:w-1/2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center gap-1">
                            {Array(5).fill('').map((_, i) => (
                                <img 
                                    key={i}
                                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                    alt="star" 
                                    className='w-4 h-4'
                                />
                            ))}
                        </div>
                        <span className="text-gray-600 text-sm font-medium">(4.0)</span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-lg text-gray-500 line-through mb-1">
                            MRP: {currency}{product.price}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mb-2">
                            {currency}{product.offerPrice}
                        </p>
                        <span className="text-sm text-gray-600">(inclusive of all taxes)</span>
                    </div>

                    {/* Product Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Product</h3>
                        <ul className="space-y-2 text-gray-700">
                            {product.description.map((desc, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <button 
                            className="flex-1 py-3.5 px-6 font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            onClick={() => { addToCart(product._id) }}
                        > 
                            Add to Cart
                        </button>
                        <button 
                            className="flex-1 py-3.5 px-6 font-semibold text-white bg-primary rounded-lg hover:bg-primary-dull transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-md"
                            onClick={() => { addToCart(product._id); navigate('/cart') }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className='flex flex-col items-center mt-16 lg:mt-20'>
                <div className='flex flex-col items-center mb-8'>
                    <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3'>Related Products</h2>
                    <div className='w-20 h-1 bg-primary rounded-full'></div>
                </div>
                
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full mb-12'>
                    {
                        relatedProducts.filter((product) => product.inStock).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
                
                <Link to={'/home'} className='mb-15' onClick={()=>screenTop(0,0)}>
                    <button className="px-8 py-3 font-semibold text-primary bg-white border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                        Return To Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;