import React, { useContext, useEffect, useState, useRef } from 'react'
import { assets } from '../assets/assets.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {   useAppContext   } from '../context/AppContext.jsx'

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input 
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white hover:border-gray-400 placeholder:text-gray-400'
  />
)

const AddAdress = () => {
  const hasWarnedRef = useRef(false);
  const navigate = useNavigate();
  const {user} = useAppContext()
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }))
  }

const onSubmitHandler = async (e) => {
  e.preventDefault(); 
  try {
    const { data } = await axios.post('/api/address/add', { address });

    if (data.success) {
      toast.success(data.message);
      navigate('/cart');
    } else {
      toast.error(data.message || "Failed to add address");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Something went wrong");
  }
};


useEffect(() => {
  if (!user && !hasWarnedRef.current) {
    toast.success("You Need To Sign In To Change The Address");
    navigate('/cart');
    hasWarnedRef.current = true;
  }
}, [user]);


  return (
    <div className='mt-16 pb-16 animate-in fade-in duration-700'>
      <p className='text-2xl md:text-3xl text-gray-600 animate-in slide-in-from-top duration-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10 gap-8'>
        <div className='flex-1 max-w-md animate-in slide-in-from-left duration-600'>
          <div onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4 animate-in slide-in-from-left duration-500 delay-100'>
              <div className='transform transition-all duration-300 hover:scale-105'>
                <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
              </div>
              <div className='transform transition-all duration-300 hover:scale-105'>
                <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
              </div>
            </div>

            <div className='transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-500 delay-200'>
              <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address" />
            </div>
            
            <div className='transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-500 delay-300'>
              <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />
            </div>

            <div className='grid grid-cols-2 gap-4 animate-in slide-in-from-left duration-500 delay-400'>
              <div className='transform transition-all duration-300 hover:scale-105'>
                <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
              </div>
              <div className='transform transition-all duration-300 hover:scale-105'>
                <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 animate-in slide-in-from-left duration-500 delay-500'>
              <div className='transform transition-all duration-300 hover:scale-105'>
                <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zipcode" />
              </div>
              <div className='transform transition-all duration-300 hover:scale-105'>
                <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
              </div>
            </div>

            <div className='transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-500 delay-600'>
              <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone" />
            </div>

            <button onClick={onSubmitHandler} className='w-full mt-8 bg-primary text-white py-3 hover:bg-primary-dull transition-all duration-300 cursor-pointer uppercase font-medium rounded-lg hover:shadow-lg hover:-translate-y-1 active:translate-y-0 animate-in slide-in-from-bottom duration-500 delay-700'>
              Save Address
            </button>
          </div>
        </div>

        <div className='animate-in slide-in-from-right duration-600 delay-200'>
          <img className='md:mr-16 mb-16 md:mb-0 max-w-full h-auto transform transition-all duration-500 hover:scale-105 hover:rotate-1' src={assets.add_address_iamge} alt="Add Address" />
        </div>
      </div>
    </div>
  )
}

export default AddAdress