import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {AuthContextProps} from "../contexts/authContext";
import {
    saveLocalStorageComplexData,
    saveLocalStorageSimpleComplexData
} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import getUser from "../../User/Infrastructure/persistence/getUser";

interface props {
    email: string,
    password: string,
    complex: AuthContextProps,
    setError: Function
}

const LoginRequest = async ({email, password, complex, setError}: props) => {
    await httpRequest('post', '/login', {
        email,
        password
    }, null).then(async (response: any) => {
        if (response.status === 200) {

            saveLocalStorageSimpleComplexData('accessToken', response.data.token.accessToken);

            let user = null;

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

                complex.setAuth(response.data.token.accessToken);
            }

        } else {
            setError(response.response.data);
        }
    });

}

export default LoginRequest;
