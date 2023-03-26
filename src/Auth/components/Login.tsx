import {useContext, useEffect, useState} from "react";

import {AuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

import LoginHook from "../hooks/loginHook";
import LoginView from "../views/login/loginView";
import {ROLES, ROLES_NAME_BY_ID} from "../../Shared/Constants/RolesConstants";
import axios from "axios";
import env from "react-dotenv";
import {ThemeContext} from "../../context/themeContext";

const Login = () => {
const BASE_URL = env.URL_API;

    const complex = useContext(AuthContext);
    const themeProvider = useContext(ThemeContext);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');


    useEffect(() => {
        healthCheck();
    }, [])

    const healthCheck = () => {
        axios.get(`${BASE_URL}/health-check`)
            .then((response: any) => {
                if (response.response.status === 404) {
                    setError('No API connection found');
                }
            })
            .catch((response: any) => {
                if (response.code === 'ERR_NETWORK') {
                    setError('No API connection found');
                }
            })
    }

    const submitLogin = () => {
        LoginHook({
            email: credentials.email,
            password: credentials.password,
            complex,
            themeProvider,
            setError
        })
            .then((response) => {
                // @ts-ignore
                if (ROLES_NAME_BY_ID[response.roleId] === ROLES.admin) {
                    return navigate('/users')
                } else {
                    return navigate('/accounts')
                }
            });
    }

    const changeCredentials = (type: string, value: string) => {
        setCredentials({...credentials, [type]: value});
    }

    return (
        <LoginView
            submitLogin={submitLogin}
            changeCredentials={changeCredentials}
            error={error}
        />
    );
}

export default Login;
