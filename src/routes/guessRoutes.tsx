import {Navigate, Outlet} from "react-router-dom";
import {getLocalStorageComplexData} from "../Shared/Infrastructure/Persistence/localStorageComplexData";

const GuessRoutes = () => {

    const SCOPES = [
        'admin',
        'guest'
    ];


    const scope = getLocalStorageComplexData();
console.log(scope);

    const exist = (scope.scope) ? scope.scope.map((sc: string) => SCOPES.includes(sc)) : false;
    return ( exist ) ? <Outlet/> : <Navigate to={'/login'}/>;
}

export default GuessRoutes;
