import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { GET_ALL_CHAT_DATA_URL, SOCKET_URL } from '../../constant.js';
import useUser from '../context/userContext.jsx';
import useMessage from '../context/messageContext';
import axios from 'axios';
const Messages = () => {
    const {userJWTtoken,username} = useUser();
    const {chatID,chatName,chatImage,resetMessageData}=useMessage();
    const socket=io(SOCKET_URL,{reconnect:true,auth:{token:userJWTtoken}});
    const [messageList,setMessageList]=useState([]);
    const fetchUserChatData=async()=>{
        const data=await axios({
            method:"GET",
            headers:{
                Authorization:`Bearer ${userJWTtoken}`
            },
            url:`${GET_ALL_CHAT_DATA_URL}&filters[chat_id][$eq]=${chatID}`
        });
        const previous_message_nested=data.data.data;
        const previous_message=previous_message_nested.map((item)=>{
            const content=item.attributes.content;
            const createdAt=item.attributes.timestamp;
            const user=item.attributes.user;
            return {content,createdAt,user}
        })
        setMessageList(previous_message);
    }

    useEffect(() => {
        fetchUserChatData();
    }, [chatID])
    
    const updateMessageList=(data)=>{
        setMessageList((prevMessageList) => [...prevMessageList, data]);
    }

    socket.on("connect", () => {
        socket.on("server_message",(new_message)=>updateMessageList(new_message));
    });
    const handleSend=()=>{
        const new_message_input=document.getElementById("new_message");
        const new_message=new_message_input.value;
        if(!new_message || new_message==="" || new_message.trim()==="") return;
        const new_message_data={
            content:new_message,
            createdAt:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            user:'user',
        }
        updateMessageList(new_message_data);
        socket.emit("user_message",chatID,new_message);
        new_message_input.value="";
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSend();
      }
    };

    const handleBakcButtonPressed=()=>{
        resetMessageData();
    }

    return (
        <div className="h-full flex flex-col">
            <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
                <div className="flex p-2 align-middle items-center">
                    <div className="p-2 sm:hidden rounded-full mr-1 hover:bg-slate-500 text-white"  onClick={handleBakcButtonPressed}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>
                    <div className="chat-image avatar">
                        <div className="w-14 h-14 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={chatImage} />
                        </div>
                    </div>
                    <div className="flex-grow p-2">
                        <div className="text-md text-gray-50 font-semibold">{chatName}</div>
                    </div>
                </div>
            </div>
            <div className='flex-1 overflow-y-scroll p-4 no-scrollbar'>
                {messageList.map((item)=>(
                    <div key={Math.random()} className={`chat ${item.user==='server'?'chat-start':'chat-end'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={`https://robohash.org/${item.user==='server'?'server':username}.png?set=set3`} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {item.user==='server'?"Server":username}
                            <time className="text-xs opacity-50">{item.createdAt}</time>
                        </div>
                        <div className="chat-bubble">{item.content}</div>
                    </div>
                ))}
            </div>
            <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center">
                    <div className="search-chat flex flex-grow p-2">
                        <input onKeyDown={handleKeyDown} id="new_message" className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md" type="text" placeholder="Type your message ..."/>
                        <div className="bg-gray-100 dark:bg-gray-800 hover:cursor-pointer dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                            <svg xmlns="http://www.w3.org/2000/svg"  className="h-6 ml-2 text-slate-500 fill-current" viewBox="0 0 24 24" onClick={handleSend}>
                                <path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages