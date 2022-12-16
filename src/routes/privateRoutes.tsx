import {useContext} from "react";
import {AuthContext} from "../context/authContext";
import {Route, Redirect} from "react-router-dom";


const PrivateRoute = ({children, ...rest}: any) => {

    const {authState} = useContext(AuthContext);

    return (
        <Route {...rest}>
            {
                !authState.accessToken
                ?
                <Redirect to={'/login'}/>
                :
                children
            }
        </Route>
    )
}

export default PrivateRoute;
