import BaseLayout from "../../Shared/layouts/baseLayout";
import {UserInterface} from "../interfaces/UserInterface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Loading from "../../components/Loading";
import UsersTable from "../components/UsersTable";
import UserModal from "../components/UserModal";
import {useRef, useState} from "react";
import createUser from "../hooks/createUser";
import getAllUsers from "../hooks/getAllUsers";
import uuid from "react-uuid";
import updateUser from "../hooks/updateUser";
import ToastComponent from "../../components/ToastComponent";
import 'bootstrap';
import ConfirmModal from "../../components/ConfirmModal";
import deleteUser from "../hooks/deleteUser";

interface props {
    loading: boolean,
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

const UserView = ({loading, users, setUsers}: props) => {

    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [createOrUpdateShow, setCreateOrUpdateShow] = useState(false);
    const [deleteModalShow, setDeleteModalShowShow] = useState(false);

    const [user, setUser] = useState<UserInterface>(INITIAL_USER);
    const [userFunction, setUserFunction] = useState<any>(() => {});

    const createNewUser = (user: UserInterface) => {
        createUser(user).then((createResponse: any) => {
            if (createResponse) {
                setToastMessage(createResponse.data)
                getAllUsers().then(response => {
                    setUsers(response);
                    setToast(true);
                });
            }
        });
    }

    const updateOldUser = (user: UserInterface) => {
        updateUser(user).then((updateResponse: any) => {
            if (updateResponse) {
                setToastMessage(updateResponse.data)
                getAllUsers().then(response => {
                    setUsers(response);
                    setToast(true);
                });
            }
        });
    }

    const deleteSelectedUser = (user: UserInterface) => {
        deleteUser(user).then((deleteResponse: any) => {
            if (deleteResponse) {
                setToastMessage(deleteResponse.data)
                getAllUsers().then(response => {
                    setUsers(response);
                    setToast(true);
                });
            }
        });
    }

    const resetUserValues = () => {
        setUser(INITIAL_USER);
        setCreateOrUpdateShow(true);
        assignUserFunction(() => createNewUser);
    }

    const updateUserFunction = () => {
        setCreateOrUpdateShow(true);
        assignUserFunction(() => updateOldUser);
    }

    const deleteUserFunction = () => {
        setDeleteModalShowShow(true);
        assignUserFunction(() => deleteSelectedUser);
    }

    const assignUserFunction = (callback: Function) => {
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
                                onClick={() => resetUserValues()}
                        >
                            <FontAwesomeIcon icon={faPlus} /> {'Include new User'}
                        </button>
                    </div>
                    {loading && users.length === 0 && <Loading/>}
                    {!loading &&
                    <UsersTable
                        users={users}
                        setUser={setUser}
                        updateUserFunction={updateUserFunction}
                        deleteUserFunction={deleteUserFunction}
                    />
                    }
                </div>
            </div>
            <UserModal
                user={user}
                setUser={setUser}
                callback={dispatchFunction}
                show={createOrUpdateShow}
                setShow={setCreateOrUpdateShow}/>
            <ConfirmModal
                title={"Delete user"}
                message={`Are you sure to delete ${user.name}?`}
                callback={dispatchFunction}
                show={deleteModalShow}
                setShow={setDeleteModalShowShow}/>
            <ToastComponent show={toast} setShow={setToast} title={'Users'} message={toastMessage}/>
        </BaseLayout>
    );
}

export default UserView;
