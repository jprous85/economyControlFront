import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import UserAdapter from "../adapters/UserAdapter";

const getUser = async (id: number) => {

    const complex = getLocalStorageComplexData();

    let user = null;

    await httpRequest('get', `/users/${id}/show`,null, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            const userAdapter = UserAdapter(response.data);
            if (userAdapter) {
                user = userAdapter;
            }
        } else {
            console.log(response.response.data.message);
        }
    });

    return user;
}

export default getUser;
