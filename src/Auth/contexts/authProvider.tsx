import React, {useReducer} from 'react';
import {authReducer} from "../../reducers/authReducer";
import {Auth} from "../../interfaces/AuthInterface";
import { AuthContext } from './authContext';
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

interface props {
    children: JSX.Element | JSX.Element[]
}

const AUTH: Auth = {
    accessToken: ''
}

export const AuthProvider = ({children}: props) => {

    const [complexData, dispatch] = useReducer(authReducer, AUTH, init);

    function init(): Auth {
        const complex = getLocalStorageComplexData();

        const stringState = complex?.accessToken ?? '';
        if (stringState) {
            try {
                AUTH.accessToken = stringState
                return AUTH;
            } catch (error) {
                return AUTH;
            }
        } else {
            return AUTH;
        }
    }

    const setAuth = (complexData: string) => {
        dispatch({type: 'accessToken', payload: {complexData}});
    }

    return <AuthContext.Provider value={{complexData: complexData, setAuth}}>{children}</AuthContext.Provider>;
}

