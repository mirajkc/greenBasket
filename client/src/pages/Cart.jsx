import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { assets, dummyAddress } from '../assets/assets.js'
import axios from 'axios'
import toast from 'react-hot-toast'

const Cart = () => {
    const { user,products, currency, cartItems, removeFromCart, getCartCount, navigate, getCartAmount, setCartItems } = useAppContext()

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState("COD")

    const getCart = () => {
        const tempArray = []
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key)
            if (product) {
                tempArray.push({ ...product, quantity: cartItems[key] })
            }
        }
        setCartArray(tempArray)
    }

    const getUserAddress = async() =>{
        try {
            const {data} = await axios.get('/api/address/get')
            if(data.success){
                setAddresses(data.addresses)
                if(data.addresses.length > 0){
                    setSelectedAddress(data.addresses[0])
                }
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch addresses")
        }
    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart()
        }
    }, [products, cartItems])

    useEffect(()=>{
        if(user){
            getUserAddress()
        }
    },[user])
    
const placeOrder = async () => {
  try {
    if (!selectedAddress) {
      return toast.error("Please Select An Address");
    }

    let data;

    const payload = {
      userId: user._id,
      items: cartArray.map(item => ({
        product: item._id,
        quantity: item.quantity,
      })),
      address: selectedAddress._id,
    };

    if (paymentOption === "COD") {
      const response = await axios.post('/api/order/cod', payload);
      data = response.data;

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate('/my-orders');
      } else {
        toast.error(data?.message || "Failed to place order");
      }
    }

    else if (paymentOption === "Online") {
      const response = await axios.post('/api/order/stripe', {
        userId : user._id,
        items : cartArray.map((item => ({
            product : item._id,
            quantity : item .quantity
        }))),
        address: selectedAddress._id,
      });
      data = response.data;

      if (data.success ) {
        window.location.replace(data.url)
      } else {
        toast.error(data.message);
      }
    }
    else {
      toast.error("Invalid payment method selected");
    }

  } catch (error) {
    console.error("Place order error:", error);
    toast.error(error.response?.data?.message || "Failed to place order");
  }
};


    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16 gap-8 animate-in fade-in duration-700">
            <div className='flex-1 max-w-4xl animate-in slide-in-from-left duration-500'>
                <h1 className="text-3xl font-medium mb-6 text-gray-800 animate-in slide-in-from-top duration-500">
                    Shopping Cart <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full animate-pulse">{getCartCount()} Items In Cart</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 bg-gray-50 px-4 py-3 rounded-lg border animate-in slide-in-from-top duration-300">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-left" style={{animationDelay: `${index * 100}ms`}}>
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0, 0) }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden hover:border-primary hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                                <img className="max-w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={product.image[0]} alt={product.name} />
                            </div>
                            <div className="space-y-1">
                                <p className="hidden md:block font-semibold text-gray-800 hover:text-primary transition-colors duration-200">{product.name}</p>
                                <div className="font-normal text-gray-500/70 space-y-1">
                                    <p>Weight: <span className="font-medium text-gray-600">{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty: <span className="font-medium text-gray-800">{product.quantity}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-semibold text-gray-800 text-lg">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto p-2 rounded-full hover:bg-red-50 hover:scale-110 transition-all duration-200 group">
                            <img src={assets.remove_icon} alt="remove" className='inline-block w-6 h-6 group-hover:rotate-90 transition-transform duration-300' />
                        </button>
                    </div>
                ))}

                <button onClick={() => { navigate('/products'); window.scrollTo(0, 0) }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium hover:text-primary-dull transition-all duration-300 hover:translate-x-2 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg">
                    <img className='group-hover:-translate-x-1 transition-transform duration-300' src={assets.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-white p-6 max-md:mt-16 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 sticky top-6 animate-in slide-in-from-right ">
                <h2 className="text-xl md:text-xl font-medium text-gray-800 relative pb-2">
                    Order Summary
                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full animate-in slide-in-from-left duration-500 delay-300"></div>
                </h2>
                <hr className="border-gray-200 my-5" />

                <div className="mb-6 space-y-4">
                    <p className="text-sm font-medium uppercase text-gray-600 tracking-wide">Delivery Address</p>
                    <div className="relative flex justify-between items-start">
                        <p className="text-gray-500 leading-relaxed">
                            {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:text-primary-dull cursor-pointer font-medium transition-colors duration-200 hover:underline">
                            Change
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-200 text-sm w-full z-10 rounded-lg shadow-lg animate-in slide-in-from-top duration-200">
                                {addresses.map((address, index) => (
                                    <p key={index} onClick={() => { setSelectedAddress(address); setShowAddress(false) }} className="text-gray-500 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 hover:text-gray-700">
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => navigate('/add-address')} className="text-primary text-center cursor-pointer p-3 hover:bg-primary/5 transition-colors duration-200 font-medium border-t border-gray-100">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium uppercase text-gray-600 tracking-wide">Payment Method</p>
                        <select
                            className="w-full border border-gray-300 bg-white px-3 py-3 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            value={paymentOption}
                            onChange={(e) => setPaymentOption(e.target.value)}
                        >
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>
                </div>

                <hr className="border-gray-200" />

                <div className="text-gray-600 mt-4 space-y-3">
                    <p className="flex justify-between items-center hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors duration-200">
                        <span>Price</span><span className="font-medium">{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between items-center hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors duration-200">
                        <span>Shipping Fee</span><span className="text-green-600 font-medium">Free</span>
                    </p>
                    <p className="flex justify-between items-center hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors duration-200">
                        <span>Tax (2%)</span><span className="font-medium">{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-semibold mt-4 pt-3 border-t border-gray-200 text-gray-800">
                        <span>Total Amount:</span><span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
                    </p>
                </div>
                <button
                    disabled={getCartCount() === 0}
                    className={`w-full py-3 mt-6 font-medium rounded-lg transition-all duration-300 ${
                        getCartCount() === 0
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-primary hover:bg-primary-dull text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                    onClick={placeOrder}
                >
                    {paymentOption === "COD" ? "Place Order " : "Proceed To CheckOut"}
                </button>
            </div>
        </div>
    ) : (
        <h1 className="text-center text-lg mt-20 text-gray-600 animate-in fade-in duration-500">No Items Found</h1>
    )
}

export default Cart