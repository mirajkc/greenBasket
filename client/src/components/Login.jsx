import React from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setShowUserLogin, setUser, navigate } = useAppContext();

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`api/user/${state}`, {
      name,
      email,
      password,
    });

    if (data.success) {  
      navigate('/home');
      setUser(data.user);
      setShowUserLogin(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Something went wrong!");
  }
};


  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-700 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-slate-800/80 backdrop-blur-sm animate-in fade-in duration-200'
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col gap-5 m-auto items-start p-6 sm:p-8 py-6 sm:py-10 w-[90%] max-w-[380px] sm:max-w-[440px] ${state === "register" ? "max-h-[90vh] overflow-y-auto" : ""} rounded-2xl shadow-2xl border border-gray-200/20 bg-white/95 backdrop-blur-lg transform transition-all duration-300 ease-out hover:shadow-3xl hover:scale-[1.01] animate-in slide-in-from-bottom-2 zoom-in-98`}
      >
        <p className={`text-2xl sm:text-3xl font-bold text-center w-full ${state === "register" ? "mb-1" : "mb-2"} bg-gradient-to-r from-primary to-primary-dull bg-clip-text text-transparent animate-in slide-in-from-top-1 duration-400`}>
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full animate-in slide-in-from-left-1 duration-300">
            <p className="text-sm font-semibold text-gray-700 mb-1 transform transition-all duration-200">Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-lg w-full p-2.5 sm:p-3 mt-1 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ease-out bg-gray-50/50 hover:bg-white hover:shadow-md focus:shadow-lg text-gray-800 placeholder-gray-400 transform hover:scale-[1.005] focus:scale-[1.005]"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full animate-in slide-in-from-left-2 duration-500 delay-150">
          <p className="text-sm font-semibold text-gray-700 mb-1 transform transition-all duration-300">Email Address</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg w-full p-2.5 sm:p-3 mt-1 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-out bg-gray-50/50 hover:bg-white hover:shadow-md focus:shadow-lg text-gray-800 placeholder-gray-400 transform hover:scale-[1.01] focus:scale-[1.01]"
            type="email"
            required
          />
        </div>

        <div className="w-full animate-in slide-in-from-left-2 duration-500 delay-300">
          <p className="text-sm font-semibold text-gray-700 mb-1 transform transition-all duration-300">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg w-full p-2.5 sm:p-3 mt-1 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-out bg-gray-50/50 hover:bg-white hover:shadow-md focus:shadow-lg text-gray-800 placeholder-gray-400 transform hover:scale-[1.01] focus:scale-[1.01]"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm text-gray-600 text-center w-full animate-in slide-in-from-bottom-1 duration-300 delay-300">
            Already have an account?{' '}
            <span onClick={() => setState("login")} className="text-primary hover:text-primary-dull cursor-pointer font-semibold transition-all duration-200 ease-out underline decoration-2 underline-offset-2 hover:underline-offset-3">
              Sign in here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 text-center w-full animate-in slide-in-from-bottom-1 duration-300 delay-300">
            Don't have an account?{' '}
            <span onClick={() => setState("register")} className="text-primary hover:text-primary-dull cursor-pointer font-semibold transition-all duration-200 ease-out underline decoration-2 underline-offset-2 hover:underline-offset-3">
              Create one here
            </span>
          </p>
        )}

        <button
          type="submit"
          className={`bg-primary hover:bg-primary-dull active:bg-primary-dull transition-all duration-200 ease-out text-white font-semibold w-full ${state === "register" ? "py-2.5 sm:py-3" : "py-3"} rounded-lg cursor-pointer shadow-lg hover:shadow-xl focus:shadow-2xl transform hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 animate-in slide-in-from-bottom-2 duration-400 delay-400`}
        >
          {state === "register" ? "Create Account" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;