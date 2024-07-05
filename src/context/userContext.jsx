import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [userJWTtoken, setUserJWTtoken] = useState(null);
  const setUserInfo = (username,userJWTtoken) => {
    setUsername(username);
    setUserJWTtoken(userJWTtoken);
  };
  return (
    <UserContext.Provider value={{ username,userJWTtoken,setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUser() {
  return useContext(UserContext);
}