import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;  
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate(); 

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch seller status
  const fetchSeller = async() => {
    try {
      const {data} = await axios.get('/api/seller/auth-seller');
      if(data.success){
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  // Fetch user auth, cart data and cart Items
  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/is-auth');

      if (data.success) {
        // Ensure cartItems is always an object
        const safeCart = data.user.cartItems && typeof data.user.cartItems === 'object' 
          ? data.user.cartItems 
          : {};

        setUser(data.user);
        setCartItems(safeCart);
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      // Don't show toast for auth errors as they're common
      if (error.response?.status !== 401) {
        toast.error("Failed to load user data");
      }
      setUser(null);
      setCartItems({});
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product/list');
      if(data.success){
        setProducts(data.products || []);
      } else {
        toast.error(data.message || "Failed to load products");
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  // Add product to cart
  const addToCart = async (itemId) => {
    try {
      const cartData = structuredClone(cartItems);
      cartData[itemId] = (cartData[itemId] || 0) + 1;
      setCartItems(cartData);
      
      // Update backend immediately
      if (user) {
        await updateCartInBackend(cartData);
      }
      
      toast.success("Added To Cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      const cartData = structuredClone(cartItems);
      if (quantity <= 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }
      setCartItems(cartData);
      
      // Update backend immediately
      if (user) {
        await updateCartInBackend(cartData);
      }
      
      toast.success("Cart Updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  // Remove product from cart
  const removeFromCart = async (itemId) => {
    try {
      const cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
        cartData[itemId] -= 1;
        if (cartData[itemId] === 0) {
          delete cartData[itemId];
        }
      }
      setCartItems(cartData);
      
      if (user) {
        await updateCartInBackend(cartData);
      }
      
      toast.success("Removed From Cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const updateCartInBackend = async (cartData) => {
    try {
      const {data} = await axios.post('/api/cart/update', {cartItems: cartData});
      if (!data.success) {
        throw new Error(data.message || "Failed to update cart");
      }
    } catch (error) {
      throw error;
    }
  };

  // Get Cart Item Count 
  const getCartCount = () => {
    let totalcount = 0;
    for(const item in cartItems) {
      if (cartItems[item] > 0) {
        totalcount += cartItems[item];
      }
    }
    return totalcount;
  };

  // Get Cart total amount 
  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if(itemInfo && cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchSeller();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    loading,
    fetchUser,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);