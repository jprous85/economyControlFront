import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";

const updateFixedStatus = async (economy: EconomyInterface, obj: Incomes | Expenses, field: string) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('put', `/economies/fixed/${economy.id}/update`,
        {
            uuid: obj.uuid,
            field: field,
            fixed: obj.fixed
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

export default updateFixedStatus;
