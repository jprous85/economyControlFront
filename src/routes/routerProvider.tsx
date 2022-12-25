import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {ThemeProvider} from "../context/themeContext";
import {AuthProvider} from "../Auth/contexts/authProvider";

import PrivateRoutes from './privateRoutes';

import User from "../User/components/User";
import GuessRoutes from './guessRoutes';
import Login from "../Auth/components/Login";
import Account from "../Account/components/Account";

const Routers = () => {

    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<Login/>}/>

                        <Route element={<GuessRoutes/>}>
                            <Route path="accounts" element={<Account/>}/>

                            <Route element={<PrivateRoutes/>}>
                                <Route path="users" element={<User/>}/>
                            </Route>

                        </Route>

                        <Route path={'*'} element={<div>Not Found</div>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default Routers;
