import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

const logoutRequest = async () => {

    const complex = getLocalStorageComplexData();

    httpRequest('post', '/logout', null, complex.accessToken).then((response: any) => {
        if (response && response.status === 200) {

        }
    })
}

export default logoutRequest;
