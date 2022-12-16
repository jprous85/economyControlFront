import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Admin from "./admin/admin";
import NoMatches from "../pages/NoMatches";
import Home from "../pages/HomePage/Home";


const Routes = () => {

    const [uid, setUid] = useState(() => {
        return window.localStorage.getItem('c_uid') || false;
    });

    const ADMIN_PATH = [
        "/admin",
        "/admin/create"
    ];

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"}>
                    <Home setUid={setUid}/>
                </Route>
                <PrivateRoute exact path={ADMIN_PATH} auth={uid}>
                    <Route path={ADMIN_PATH} component={Admin}/>
                </PrivateRoute>
                <Route path={"*"} component={NoMatches}/>
            </Switch>
        </BrowserRouter>
    );
}

const PrivateRoute = ({children, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

export default Routes;
