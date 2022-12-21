import {useEffect, useState} from "react";
import getAllUsers from "../hooks/getAllUsers";
import UserView from "../views/UserView";
import {UserInterface} from "../interfaces/UserInterface";

const User = () => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<Array<UserInterface>>([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response);
            setLoading(false);
        });
    }, []);

    return (
        <UserView
            loading={loading}
            setLoading={setLoading}
            users={users}
            setUsers={setUsers}
            getAllUsers={getAllUsers}
        />
    );

}

export default User;
