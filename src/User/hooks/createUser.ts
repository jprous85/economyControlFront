import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {UserInterface} from "../interfaces/UserInterface";

const createUser = async (user: UserInterface) => {

    const complex = getLocalStorageComplexData();

    await httpRequest('post', `/users/create`,user, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
        } else {
            console.log(response.response.data.message);
        }
    });

    return user;
}

export default createUser;
