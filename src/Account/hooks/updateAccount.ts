import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {AccountInterface} from "../interfaces/AccountInterface";

const updateAccount = async (account: AccountInterface) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('put', `/accounts/${account.uuid}/update`, account, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default updateAccount;
