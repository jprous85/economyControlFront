import {useContext, useState} from "react";

import {AuthContext} from "../../Domain/contexts/authContext";
import {useNavigate} from "react-router-dom";

import LoginRequest from "../hooks/loginRequest";
import LoginView from "../views/login/loginView";

const Login = () => {

    const complex = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const submitLogin = () => {
        LoginRequest({
            email: credentials.email,
            password: credentials.password,
            complex,
            setError
        })
            .then(() => {
                return navigate('/users')
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
