import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {UserInterface} from "../interfaces/UserInterface";

const createUser = async (user: UserInterface) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('post', `/users/create`,user, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default createUser;
