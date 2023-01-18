import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {EconomyInterface, Expenses} from "../interfaces/EconomyInterface";

const createSpent = async (economy: EconomyInterface, spent: Expenses) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('put', `/economies/spent/${economy.id}/add`,
        spent,
        complex.accessToken).then((response: any) => {
        if (response.status === 201) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default createSpent;
