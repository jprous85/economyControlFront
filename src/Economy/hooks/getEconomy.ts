import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";

const GetEconomy = async (id: string | undefined) => {
    const complex = getLocalStorageComplexData();

    let tempRes;
    await httpRequest('get', `/economies/${id}/show`, null, complex.accessToken)
        .then(response => {
            tempRes = response;
        });

    return tempRes;
}

export default GetEconomy;
