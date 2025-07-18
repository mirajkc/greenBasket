import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { useLocation } from 'react-router-dom'

const Loading = () => {
  const { navigate } = useAppContext()
  let {search} = useLocation()
  const query = new URLSearchParams(search)
  const nextUrl = query.get('next');

  useEffect(()=>{
    if(nextUrl){
      setTimeout(()=>{
        navigate(`/${nextUrl}`)
      },5000)
    } else {
      // Navigate to my-orders after 5 seconds if no nextUrl is provided
      setTimeout(()=>{
        navigate('/my-orders')
      },5000)
    }
  },[])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning circle */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <p className="text-primary font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default Loading