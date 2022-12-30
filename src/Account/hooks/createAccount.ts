import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import {AccountInterface} from "../interfaces/AccountInterface";

const createAccount = async (account: AccountInterface) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;
    await httpRequest('post', `/accounts/create`,
        {
            name: account.name,
            description: account.description,
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

export default createAccount;
