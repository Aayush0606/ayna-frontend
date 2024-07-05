import React, { useEffect } from 'react'
import useMessage from '../context/messageContext.jsx';

const ConversationItem = ({index,name,image_url}) => {
    const {chatID,setChatInfo}=useMessage();
    const _class = chatID===index ? 'dark:bg-slate-600' : '';
    const handleClick=()=>{
        setChatInfo(index,[]);
    }
    return (
        <div onClick={handleClick}>
            <div className={'conversation-item p-1 dark:bg-gray-800 hover:bg-slate-600 m-1 rounded-md ' + _class} >
                <div className={'flex items-center p-2  cursor-pointer'}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md ">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationItem