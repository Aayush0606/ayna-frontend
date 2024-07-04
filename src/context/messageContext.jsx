import { createContext, useContext, useState } from "react";

export const MessageContext = createContext({});

export const MessageContextProvider = ({ children }) => {
  const [chatID, setChatID] = useState(null);
  const [chatData, setChatData] = useState(null);
  const setChatInfo = (chatID,chatData) => {
    setChatID(chatID);
    setChatData(chatData);
  };
  return (
    <MessageContext.Provider value={{ chatID,chatData,setChatInfo }}>
      {children}
    </MessageContext.Provider>
  );
};

export default function useMessage() {
  return useContext(MessageContext);
}