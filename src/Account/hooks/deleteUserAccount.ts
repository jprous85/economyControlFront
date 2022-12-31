import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import { UserInterface } from "../../User/interfaces/UserInterface";
import {AccountInterface} from "../interfaces/AccountInterface";

const deleteUserAccount = async (account: AccountInterface, user: UserInterface) => {

    const complex = getLocalStorageComplexData();

    let tempRes = null;

    await httpRequest('put', `/accounts/${account.id}/deleteUser/${user.id}`,null, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            tempRes = response;
        } else {
            console.log(response.response.data.message);
        }
    });

    return tempRes;
}

export default deleteUserAccount;
