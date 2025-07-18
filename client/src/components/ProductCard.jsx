import React from "react";
import {assets} from '../assets/assets.js'
import {useAppContext} from '../context/AppContext.jsx'

const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate, updateCartItem} = useAppContext();
    
    return product && (
       <div className="group border border-gray-200 hover:border-gray-300 rounded-xl p-4 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
       onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
       scrollTo(0,0)
    }}
       >
            {/* Product Image */}
            <div className="cursor-pointer flex items-center justify-center mb-4 p-2 rounded-lg bg-gray-50 overflow-hidden">
                <img 
                    className="group-hover:scale-110 transition-transform duration-300 max-w-24 md:max-w-32 h-auto object-contain" 
                    src={product.image[0]} 
                    alt={product.name} 
                />
            </div>
            
            {/* Product Details */}
            <div className="space-y-2">
                {/* Category */}
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {product.category}
                </p>
                
                {/* Product Name */}
                <h3 className="text-gray-900 font-semibold text-base md:text-lg leading-tight line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex items-center">
                        {Array(5).fill('').map((_, i) => (
                            <img 
                                key={i} 
                                src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                                alt="star" 
                                className="w-3 h-3"
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                </div>
                
                {/* Price and Cart Section */}
                <div className="flex items-end justify-between pt-2">
                    {/* Price */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-lg md:text-xl font-bold text-primary">
                                {currency}{product.offerPrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                                {currency}{product.price}
                            </span>
                        </div>
                        {/* Savings */}
                        <span className="text-xs text-green-600 font-medium">
                            Save ${(product.price - product.offerPrice).toFixed(2)}
                        </span>
                    </div>
                    
                    {/* Cart Controls */}
                    <div className="flex-shrink-0" onClick={(e) => {e.stopPropagation();}}>
                        {!cartItems[product._id] ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-primary/10 hover:bg-primary/20 border border-primary/40 hover:border-primary/60 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium text-primary min-w-[70px]" 
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.cart_icon} alt="add to cart" className="w-4 h-4" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center bg-primary/15 rounded-lg overflow-hidden border border-primary/30 min-w-[70px] h-9">
                                <button 
                                    onClick={() => {removeFromCart(product._id)}} 
                                    className="flex items-center justify-center w-8 h-full hover:bg-primary/20 transition-colors duration-200 text-primary font-medium"
                                >
                                    -
                                </button>
                                <span className="flex items-center justify-center min-w-[24px] text-sm font-medium text-primary bg-white/50">
                                    {cartItems[product._id]}
                                </span>
                                <button 
                                    onClick={() => addToCart(product._id)} 
                                    className="flex items-center justify-center w-8 h-full hover:bg-primary/20 transition-colors duration-200 text-primary font-medium"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;