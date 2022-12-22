import {UserInterface} from "../interfaces/UserInterface";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ROLES_NAME_BY_ID} from "../../Shared/Constants/RolesConstants";

interface props {
    users: Array<UserInterface>,
    setUser: Function,
    updateUserFunction: Function,
    deleteUserFunction: Function
}

const UsersTable = ({users, setUser, updateUserFunction, deleteUserFunction}: props) => {

    const assignUser = (user: UserInterface) => {
        updateUserFunction();
        return setUser(user);
    }

    const deleteUser = (user: UserInterface) => {
        deleteUserFunction();
        return setUser(user);
    }

    return (
        <table className={'table table-responsive table-striped'}>
            <thead>
            <tr>
                <th>id</th>
                <th>uuid</th>
                <th>Name</th>
                <th>email</th>
                <th>Role</th>
                <th>Last login</th>
                <th>fecha creación</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user: UserInterface) => {
                // @ts-ignore
                const roleName = ROLES_NAME_BY_ID[user.roleId];
                return (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.uuid}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{roleName}</td>
                        <td>{user.lastLogin}</td>
                        <td>{user.createdAt}</td>
                        <td className={''}>
                            <a href="#"
                               className="btn btn-primary"
                               onClick={() => assignUser(user)}
                            >
                                <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                                &nbsp;
                                {'Modify'}
                            </a>
                            &nbsp;
                            &nbsp;
                            <a href="#"
                               className="btn btn-danger"
                               onClick={() => deleteUser(user)}
                            >
                                <FontAwesomeIcon icon={icon({name: 'xmark', style: 'solid'})}/>
                                &nbsp;
                                {'Delete'}
                            </a>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default UsersTable;
