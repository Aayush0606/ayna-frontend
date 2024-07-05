import { createContext, useContext, useState } from "react";

export const MessageContext = createContext({});

export const MessageContextProvider = ({ children }) => {
  const [chatID, setChatID] = useState(null);
  const [chatName, setChatName] = useState(null);
  const [chatImage,setChatImage]=useState(null);
  const setChatInfo = (chatID,chatName,url) => {
    setChatID(chatID);
    setChatName(chatName);
    setChatImage(url)
  };
  const resetMessageData=()=>{
    setChatID(null);
    setChatName(null);
    setChatImage(null);
  }
  return (
    <MessageContext.Provider value={{ chatID,chatName,chatImage,setChatInfo,resetMessageData }}>
      {children}
    </MessageContext.Provider>
  );  
};

export default function useMessage() {
  return useContext(MessageContext);
}