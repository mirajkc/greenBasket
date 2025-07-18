import React from "react";
import { useAppContext } from '../../context/AppContext.jsx'
import { assets } from "../../assets/assets.js";
import { Link, Outlet, NavLink } from "react-router-dom";
import navbar_logo from '../../assets/navbar_logo.png';
import axios from "axios";
import toast from "react-hot-toast";

const SellerLayout = () => {
     const{navigate} = useAppContext()
     
     const sidebarLinks = [
        { name: "AddProduct", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logoutFunction = async()=>{
      try {
        const {data} = await axios.get('/api/seller/logout')
        if(data.success){
         toast.success(data.message)   
         navigate('/home')
         scrollTo(0,0)
        }else{
            toast.error(data.message)
        }
      } catch (error) {
         toast.error(data.message)
      }

    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header - Fixed height */}
            <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-sm flex-shrink-0">
                <Link to="/home" className="group">
                    <img src={navbar_logo} alt="dummyLogoColored"  className="h-11 w-auto group-hover:scale-105 transition-transform duration-300 ease-out" />
                </Link>
                <div className="flex items-center gap-5 text-gray-600">
                    <p className="font-medium">Hi! Admin</p>
                    <button onClick={logoutFunction} className='border border-gray-300 rounded-full text-sm px-4 py-1 bg-primary text-white hover:bg-primary-dull active:bg-primary-dull transition-all duration-200 ease-out font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1'>
                        Logout
                    </button>
                </div>
            </header>
            
            {/* Main Content Area - Takes remaining height */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-16 md:w-64 border-r border-gray-300 bg-white shadow-sm flex flex-col flex-shrink-0">
                    <nav className="flex-1 pt-4">
                        {sidebarLinks.map((item) => (
                            <NavLink to={item.path} key={item.name} end={item.path==='/seller'}
                                className={({isActive})=>`flex items-center py-4 px-4 gap-3 group transition-all duration-200 ease-out
                                     ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary shadow-sm"
                                        : "hover:bg-primary/5 hover:text-primary-dull border-white hover:border-primary/20 hover:shadow-sm"
                                    }`
                                }
                            >
                                <img src={item.icon} alt="" className="w-7 h-7 group-hover:scale-110 transition-transform duration-200 ease-out flex-shrink-0" />
                                <p className="hidden md:block font-medium text-sm">{item.name}</p>
                            </NavLink>
                        ))}
                    </nav>
                </aside>
                
                {/* Main Content */}
                <main className="flex-1 bg-gray-50 overflow-auto">
                    <div className="h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SellerLayout