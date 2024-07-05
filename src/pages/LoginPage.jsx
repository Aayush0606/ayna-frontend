import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../../constant.js';
import axios from 'axios';
import useUser from '../context/userContext.jsx';
import { ToastContainer,toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
function LoginPage() {
    const navigate=useNavigate();
    const {setUserInfo}=useUser();
    const handleLoginRequest=async(e)=>{
        e.preventDefault();
        const identifier=e.target.username.value;
        const password=e.target.password.value;
        if(!identifier || identifier==="" || identifier.trim()==="") alert("Please enter username");
        if(!password || password==="" || password.trim()==="") alert("Please enter password");
        try {
            const data=await axios({
                method:"POST",
                data:{
                    identifier,
                    password
                },
                url:LOGIN_URL
            });
            const jwtToken=data.data.jwt;
            const userId=data.data.user.id;
            const username=data.data.user.username;
            setUserInfo(username,jwtToken,userId);
            localStorage.setItem("user",JSON.stringify({username,jwtToken,userId}));
            toast.success('Login successfull!! Redirecting...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }
  return (
    <>
        <ToastContainer/>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleLoginRequest}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username/Email</label>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email or Username" required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default LoginPage