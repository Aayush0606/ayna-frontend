import { Outlet,Navigate } from "react-router-dom";
import useUser from "../context/userContext.jsx";

const ProtectedRoutes=()=>{
    const {username}=useUser();
    const user=username?true:false;
    return user?<Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoutes;