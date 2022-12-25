import {useContext, useState} from "react";

import {AuthContext} from "../contexts/authContext";
import {useNavigate} from "react-router-dom";

import LoginHook from "../hooks/loginHook";
import LoginView from "../views/login/loginView";
import {ROLES, ROLES_NAME_BY_ID} from "../../Shared/Constants/RolesConstants";

const Login = () => {

    const complex = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const submitLogin = () => {
        LoginHook({
            email: credentials.email,
            password: credentials.password,
            complex,
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
