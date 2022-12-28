import {useContext} from "react";
import {AuthContext} from "../Auth/contexts/authContext";
import {Outlet, Navigate} from "react-router-dom";
import IsAdmin from "../Shared/utils/isAdmin";


const PrivateRoutes = () => {

    const {complexData} = useContext(AuthContext);

    return ((complexData.accessToken && IsAdmin()) ? <Outlet/> : <Navigate to={'/login'}/>)
}

export default PrivateRoutes;
