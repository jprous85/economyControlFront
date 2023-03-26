import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {AuthContextProps} from "../contexts/authContext";
import {
    saveLocalStorageComplexData,
    saveLocalStorageSimpleComplexData
} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import getUser from "../../User/hooks/getUser";

interface props {
    email: string,
    password: string,
    complex: AuthContextProps,
    themeProvider: any,
    setError: Function
}

const LoginHook = async ({email, password, complex, themeProvider, setError}: props) => {

    let user: any = null;

    await httpRequest('post', '/login', {
        email,
        password
    }, null).then(async (response: any) => {
        if (response.status === 200) {

            saveLocalStorageSimpleComplexData('accessToken', response.data.token.accessToken);

            await getUser(response.data.token.token.user_id).then(response => {
                user = response;
            });

            if (user) {
                saveLocalStorageComplexData({
                    accessToken: response.data.token.accessToken,
                    scope: response.data.token.token.scopes,
                    userId: response.data.token.token.user_id,
                    user: user,
                    theme: response.data.theme
                });
                complex.changeSetAuth(response.data.token.accessToken);
                themeProvider.setTheme(response.data.theme);
            }

        } else {
            setError(response.response.data);
        }

    });

    return user;

}

export default LoginHook;
