import React from 'react'
import Conversation from './Conversation';
import Messages from './Messages';
import useMessage from '../context/messageContext.jsx';
import useUser from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CREATE_NEW_CHAT_URL } from '../../constant.js';
import { ToastContainer,toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
const Chat = () => {
    
    const {chatID,setChatInfo,resetMessageData}=useMessage();
    const {username,userId,userJWTtoken,setUserChatInfo,resetUserData}=useUser();
    const navigate=useNavigate();

    const handleUserLogout=()=>{
        resetUserData();
        resetMessageData();
        localStorage.removeItem('user');
        navigate('/login');
    }

    const addNewChat=async()=>{
        const chat_title=document.getElementById('chat_title');
        const chat_image=`https://robohash.org/${chat_title.value}_${Math.random()*10}.png?set=set3`;
        try {
            const data=await axios({
                method:"POST",
                data:{
                    data:
                    {
                        chat_title:chat_title.value,
                        chat_image,
                        user_id:userId
                    }
                },
                headers:{
                    Authorization:`Bearer ${userJWTtoken}`  
                },
                url:CREATE_NEW_CHAT_URL
            })
            setUserChatInfo([{chat_id:data.data.data.id,chat_title:chat_title.value,chat_image}]);
            setChatInfo(data.data.data.id,chat_title.value);
            toast.success('New chat created', {
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
        } catch (error) {
            toast.error('Unable to create chat room', {
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
        chat_title.value="";
    }

    return (
        <>
        <ToastContainer/>
        <div className="">
            <div className="flex bg-white dark:bg-gray-900">
                <div className={`${chatID?'hidden':'block'} sm:block w-full sm:w-44 md:w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2`}>
                    <div className="h-full overflow-y-auto">
                        <div className='flex justify-between'>
                            <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">{username}</div>
                            <div className='flex items-center' onClick={handleUserLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 text-gray-500 hover:text-gray-700 fill-current cursor-pointer' viewBox="0 0 24 24">
                                    <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="p-3 text-center font-bold cursor-pointer text-gray-700 dark:text-gray-200  text-sm p-3 focus:outline-none  w-full rounded-md">
                            <button className="btn w-full font-bold" onClick={()=>document.getElementById('my_modal_5').showModal()}>New Chat</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">New Chat!</h3>
                                <input className='py-4 bg-transparent w-full focus:border-red-600' id="chat_title" placeholder='Enter chat name'/>
                                <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById('chat_title').value=""}>✕</button>
                                </form>
                                <form method="dialog">
                                    <button className="btn" onClick={addNewChat}>Add</button>
                                </form>
                                </div>
                            </div>
                            </dialog>
                        </div>
                        <Conversation/>
                    </div>
                </div>               
                <div className={`flex-grow  h-screen p-2 rounded-md ${chatID?'block':'hidden'} sm:block`}>
                        {chatID!==null?
                            <Messages/>:
                            (
                                <div className='flex items-center justify-center font-bold h-full'>Select or start a new chat</div>
                            )
                        }
                </div>
            </div>
        </div>
        </>
    )
}

export default Chat