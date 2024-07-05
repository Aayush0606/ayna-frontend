import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoutes=()=>{
    const userDetails=JSON.parse(localStorage.getItem('user'));
    const user=userDetails?true:false;
    return user?<Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoutes;