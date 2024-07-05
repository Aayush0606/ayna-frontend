import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useUser from "./context/userContext.jsx";
function App() {
  const {setUserInfo}=useUser();
  useEffect(() => {
    const userDetails=JSON.parse(localStorage.getItem('user'));
    if(userDetails){
        setUserInfo(userDetails.username,userDetails.jwtToken,userDetails.userId);
    }
  }, [])
  
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
