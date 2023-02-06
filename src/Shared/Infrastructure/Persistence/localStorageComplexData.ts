import {decryptData, encryptData} from "../../utils/CryptAndDecrypt";
import {AuthComplex} from "../../../Auth/Interfaces/AuthInterface";
import {getLocalStorage, saveLocalStorage} from "./localStorage";
import {UserInterface} from "../../../User/interfaces/UserInterface";

export const getLocalStorageComplexData = () => {
    const localStorageData = getLocalStorage('complexData');
    const complexData = (localStorageData) ? decryptData(localStorageData) : null;

    if (complexData) {
        return JSON.parse(complexData);
    }

    return null;
}

interface props {
    accessToken: string;
    scope: string[];
    userId: number;
    user: UserInterface;
    theme: string;
}

export const saveLocalStorageComplexData = ({accessToken, scope, userId, user, theme}: props) => {

    const AuthConfidence: AuthComplex = {
        accessToken,
        scope,
        userId,
        user,
        theme
    }
    
    console.log(AuthConfidence);
    
    saveLocalStorage('complexData', encryptData(JSON.stringify(AuthConfidence)));
}

export const saveLocalStorageSimpleComplexData = (type: string, value: string) => {

    const AuthConfidence: Object = {
        [type]: value
    }
    saveLocalStorage('complexData', encryptData(JSON.stringify(AuthConfidence)));
}

export const saveLocalStorageToComplexDataStack = (type: string, value: string) =>
{
    const complexData = getLocalStorageComplexData();
    complexData[type] = value;

    saveLocalStorageComplexData(complexData);
}
