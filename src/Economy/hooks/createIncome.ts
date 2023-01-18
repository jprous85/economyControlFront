import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {EconomyInterface, Incomes} from "../interfaces/EconomyInterface";

const createIncome = async (economy: EconomyInterface, income: Incomes) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('put', `/economies/income/${economy.id}/add`,
        income,
        complex.accessToken).then((response: any) => {
        if (response.status === 201) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default createIncome;
