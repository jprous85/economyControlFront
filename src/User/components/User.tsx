import BaseLayout from "../Shared/layouts/baseLayout";
import {useContext} from "react";
import {AuthContext} from "../Auth/contexts/authContext";
import getAllUsers from "./hooks/getAllUsers";

const User = () => {

    const context = useContext(AuthContext);

    getAllUsers().then(response => {
        console.log(response);
    });

    return(
        <BaseLayout>
            <div className={'row'}>
                <div className="col-md-12">
                    User
                </div>
            </div>
        </BaseLayout>
    );
}

export default User;
