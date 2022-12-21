import BaseLayout from "../../Shared/layouts/baseLayout";
import {UserInterface} from "../interfaces/UserInterface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Loading from "../../components/Loading";
import UsersTable from "../components/UsersTable";
import UserModal from "../components/UserModal";
import {useState} from "react";
import createUser from "../hooks/createUser";
import getAllUsers from "../hooks/getAllUsers";
import uuid from "react-uuid";

interface props {
    loading: boolean,
    setLoading: Function,
    users: Array<UserInterface>,
    setUsers: Function,
    getAllUsers: Function
}

const INITIAL_USER = {
    id: null,
    uuid: uuid(),
    roleId: 0,
    name: '',
    firstSurname: null,
    secondSurname: null,
    email: '',
    age: null,
    gender: null,
    lang: '',
    lastLogin: '',
    active: 0,
    verified: 0,
    createdAt: '',
    updatedAt: null
}

const UserView = ({loading, setLoading, users, setUsers}: props) => {

    const [user, setUser] = useState<UserInterface>(INITIAL_USER);
    const [userFunction, setUserFunction] = useState<any>(() => {});

    const createNewUser = (user: UserInterface) => {
        createUser(user).then(() => {
            setLoading(true);
            getAllUsers().then(response => {
                setUsers(response);
                setLoading(false);
            });
        });
    }

    const resetUserValues = () => {
        setUser(INITIAL_USER);
        createOrModifyUserFunction(() => createNewUser);
    }

    const createOrModifyUserFunction = (callback: Function) => {
        setUserFunction(callback);
    }

    const dispatchFunction = () => {
        userFunction(user);
    }

    return (
        <BaseLayout>
            <div className={'row'}>
                <div className="col-md-12">
                    <div className={'text-end mt-4'}>
                        <button className={'btn btn-primary'}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => resetUserValues()}
                        >
                            <FontAwesomeIcon icon={faPlus} /> {'Include new User'}
                        </button>
                    </div>
                    {loading && users.length === 0 && <Loading/>}
                    {!loading && <UsersTable users={users} setUser={setUser}/>}
                </div>
            </div>
            <UserModal user={user} setUser={setUser} callback={dispatchFunction}/>
        </BaseLayout>
    );
}

export default UserView;
