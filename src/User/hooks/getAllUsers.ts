import {httpRequest} from "../../Shared/Infrastructure/Persistence/HttpRequest";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import userAdapter from "../adapters/UserAdapter";
import { UserInterface } from "../interfaces/UserInterface";

const getAllUsers = async () => {

    const complex = getLocalStorageComplexData();

    let users: Array<UserInterface> = [];

    await httpRequest('get', `/users/read`,null, complex.accessToken).then((response: any) => {
        if (response.status === 200) {
            response.data.map((data: any) => {
                const user = userAdapter(data);
                users.push(<UserInterface>user);
            });
        } else {
            console.log(response.response.data.message);
        }
    });

    return users;
}

export default getAllUsers;
