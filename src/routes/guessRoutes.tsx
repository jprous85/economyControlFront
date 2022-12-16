import {useContext} from "react";
import {AuthContext} from "../context/authContext";
import {Outlet, Navigate} from "react-router-dom";


const PrivateRoutes = () => {

    const {authState} = useContext(AuthContext);

    return ( authState.accessToken ? <Outlet/> : <Navigate to={'/login'}/>)
}

export default PrivateRoutes;
