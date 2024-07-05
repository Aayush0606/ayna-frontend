import React from 'react'
import ConversationItem from './ConversationItem';
import useUser from '../context/userContext';
const Conversation = () => {
    
    const {userChats} = useUser();
    return (
        <div className="p-1 no-scrollbar">
            {
                userChats.map((item, index) => (
                    <ConversationItem 
                        key={index}
                        index={index}
                        name={item.chat_title}
                        image_url={item.chat_image}
                    />
                ))
            }
        </div>
    )
}

export default Conversation