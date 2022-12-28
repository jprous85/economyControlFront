import { httpRequest } from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

const GetAllAccounts = async () => {

    const complex = getLocalStorageComplexData();

    let tempRes;
    await httpRequest('get', '/accounts/read', null, complex.accessToken)
        .then(response => {
            if (response.status === 200) {
                tempRes = response;
            } else {
                console.log(response.response.data.message);
            }
        });

    return tempRes;
}

export default GetAllAccounts;
