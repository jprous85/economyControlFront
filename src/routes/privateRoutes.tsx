import {useContext} from "react";
import {AuthContext} from "../Auth/contexts/authContext";
import {Outlet, Navigate} from "react-router-dom";
import {getLocalStorageComplexData} from "../Shared/Infrastructure/Persistence/localStorageComplexData";


const PrivateRoutes = () => {

    const {complexData} = useContext(AuthContext);

    const scope = getLocalStorageComplexData();

    const exist = (scope) ? scope.scope.includes('admin') : false;

    return ((complexData.accessToken && exist) ? <Outlet/> : <Navigate to={'/login'}/>)
}

export default PrivateRoutes;
