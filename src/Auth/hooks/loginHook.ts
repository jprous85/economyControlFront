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
    setError: Function
}

const LoginHook = async ({email, password, complex, setError}: props) => {

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
                    user: user
                });
                complex.changeSetAuth(response.data.token.accessToken);

            }

        } else {
            setError(response.response.data);
        }

    });

    return user;

}

export default LoginHook;
