import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userJWTtoken, setUserJWTtoken] = useState(null);
  const [userChats, setUserChats] = useState([]);

  const setUserChatInfo=(data)=>{
    const updatedChats=[data,...userChats];
    setUserChats(updatedChats);
  }
  const setUserInfo = (username,userJWTtoken,userId) => {
    setUserId(userId);
    setUsername(username);
    setUserJWTtoken(userJWTtoken);
  };
  return (
    <UserContext.Provider value={{ userId,username,userJWTtoken,userChats,setUserInfo,setUserChatInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUser() {
  return useContext(UserContext);
}