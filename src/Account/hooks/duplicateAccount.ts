import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {AccountInterface} from "../interfaces/AccountInterface";

const duplicateAccount = async (account: AccountInterface) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('get', `/accounts/${account.uuid}/duplicate`, account, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default duplicateAccount;
