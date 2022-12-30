import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {AccountInterface} from "../interfaces/AccountInterface";

const deleteAccount = async (account: AccountInterface) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;

    await httpRequest('delete', `/accounts/${account.id}/delete`,null, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default deleteAccount;
