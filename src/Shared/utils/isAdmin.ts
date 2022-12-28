import {getLocalStorageComplexData} from "../Infrastructure/Persistence/localStorageComplexData";

const IsAdmin = () => {
    const scope = getLocalStorageComplexData();
    return (scope) ? scope.scope.includes('admin') : false;
}

export default IsAdmin;
