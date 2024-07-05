import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import useUser from "./context/userContext.jsx";
import { GET_ALL_CHAT_URL } from "../constant.js";
function App() {
  const {userId,setUserInfo,setUserChatInfo}=useUser();
  const loadChats=async(jwt)=>{
    const data=await axios({
        method:"GET",
        headers:{
            Authorization:`Bearer ${jwt}`
        },
        url:`${GET_ALL_CHAT_URL}&filters[user_id]=${userId}`
    });
    const allChatNestedData=data.data.data;
    const allChatData=allChatNestedData.map(item=>{
      return {chat_id:item.id,chat_image:item.attributes.chat_image,chat_title:item.attributes.chat_title}
    });
    setUserChatInfo(allChatData)
  }
  useEffect(() => {
    const userDetails=JSON.parse(localStorage.getItem('user'));
    if(userDetails){
      setUserInfo(userDetails.username,userDetails.jwtToken,userDetails.userId);
      loadChats(userDetails.jwtToken);
    }
  }, [userId])
  
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
