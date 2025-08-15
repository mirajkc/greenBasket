import React, { useEffect, useState } from 'react'
import { useAppContext} from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'


const SellerLogin = () => {
  const {isSeller, setIsSeller , navigate , axios} =  useAppContext()
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  useEffect(()=>{
    if(isSeller){
      window.location.pathname=('/seller')
    }
  },[isSeller])

const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();
    const { data } = await axios.post('api/seller/login', {
      email: email.trim(),
      password
    });
    if (data.success) {
      setIsSeller(true);
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  return !isSeller &&  (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-xl shadow-2xl border border-gray-200 bg-white backdrop-blur-sm transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] animate-in slide-in-from-bottom-4 duration-700'>
        <p className='text-2xl font-bold m-auto text-gray-800 tracking-wide' ><span className='text-primary bg-gradient-to-r from-primary to-primary-dull bg-clip-text text-transparent'>Seller</span> Login</p>
        <div className='w-full'>
          <p className='text-gray-700 font-medium mb-1'>Email</p>
          <input 
            type="email" 
            placeholder='Enter Your Email' 
            className='border border-gray-200 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 hover:bg-white hover:border-primary-dull text-gray-800 placeholder:text-gray-400' 
            required 
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
          />
        </div>
        <div className='w-full'>
          <p className='text-gray-700 font-medium mb-1'>Password</p>
          <input 
            type="password"  
            placeholder='Enter Your Password' 
            className='border border-gray-200 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 hover:bg-white hover:border-primary-dull text-gray-800 placeholder:text-gray-400' 
            required 
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
          />
        </div>
        <button className='bg-primary hover:bg-primary-dull active:bg-primary-dull transition-all duration-200 ease-out text-white font-semibold w-full py-3 rounded-lg cursor-pointer shadow-lg hover:shadow-xl focus:shadow-2xl transform hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 animate-in slide-in-from-bottom-2 duration-400 delay-400'>
          Login
        </button>
      </div>
    </form>
  )
}

export default SellerLogin