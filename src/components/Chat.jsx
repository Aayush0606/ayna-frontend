import React from 'react'
import Conversation from './Conversation';
import Messages from './Messages';
import useMessage from '../context/messageContext.jsx';

const Chat = () => {
    
    const {chatID}=useMessage();
    return (
        <>
        <div className="">
            <div className="flex bg-white dark:bg-gray-900">
                <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block ">
                    <div className="h-full overflow-y-auto">
                        <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Potato</div>
                        <div className="p-3 text-center font-bold cursor-pointer hover:bg-gray-500 text-gray-700 dark:text-gray-200  text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-md">
                            <p>New Chat</p>
                        </div>
                        <Conversation/>
                    </div>
                </div>               
                <div className="flex-grow  h-screen p-2 rounded-md">
                        {chatID!==null?<Messages/>:<div>Select or start a new chat</div>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Chat