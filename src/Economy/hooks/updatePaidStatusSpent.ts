import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {EconomyInterface, Expenses} from "../interfaces/EconomyInterface";

const updatePaidStatusSpent = async (economy: EconomyInterface, spent: Expenses) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('put', `/economies/spent/${economy.id}/paid`,
        {
            uuid: spent.uuid,
            status: spent.paid
        },
        complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default updatePaidStatusSpent;
