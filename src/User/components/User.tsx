import {useEffect, useState} from "react";
import getAllUsers from "../hooks/getAllUsers";
import UserView from "../views/UserView";
import {UserInterface} from "../interfaces/UserInterface";

const User = () => {
    const [users, setUsers] = useState<Array<UserInterface>>([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response);
        });
    }, []);

    console.log(users);
    return (
        <UserView users={users} />
    );

}

export default User;
