import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'

import LandingPage from './pages/LandingPage.jsx'
import Home from './pages/Home.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ContactUs from './pages/ContactUs.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import AddAdress from './pages/AddAdress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'

import { useAppContext } from './context/AppContext.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Orders from './pages/seller/Orders.jsx'
import Loading from './components/Loading.jsx'


const App = () => {
  const { showUserLogin, isSeller } = useAppContext()
  const location = useLocation()

  // Check if current route is /seller or any seller sub-route
  const isSellerPage = location.pathname.startsWith('/seller')

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {/* Only show NavBar for non-seller pages */}
      {!isSellerPage && <NavBar />}
      
      {showUserLogin && <Login />}
      <Toaster />

      {/* Only apply padding if not on /seller */}
      <div className={isSellerPage ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAdress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          
          
          {/* Seller Routes */}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {/* Only show Footer for non-seller pages */}
      {!isSellerPage && <Footer />}
    </div>
  )
}

export default App