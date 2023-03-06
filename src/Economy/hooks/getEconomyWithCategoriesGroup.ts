import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";

const GetEconomyWithCategoriesGroup = async (uuid: string | undefined) => {
    const complex = getLocalStorageComplexData();

    let tempRes;
    await httpRequest('get', `/economies/${uuid}/groupCategories`, null, complex.accessToken)
        .then(response => {
            tempRes = response;
        });

    return tempRes;
}

export default GetEconomyWithCategoriesGroup;
