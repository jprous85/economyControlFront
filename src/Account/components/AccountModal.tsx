import SimpleModalDialog from "../../components/SimpleModalDialog";
import React, {ChangeEvent, useEffect, useState} from "react";
import {AccountInterface} from "../interfaces/AccountInterface";
import {UserInterface} from "../../User/interfaces/UserInterface";
import getUser from "../../User/hooks/getUser";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import deleteUserAccount from "../hooks/deleteUserAccount";
import uuid from "react-uuid";
import ConfirmModal from "../../components/ConfirmModal";
import ToastComponent from "../../components/ToastComponent";
import deleteElement from "../hooks/DeleteElementOfArray";
import deleteOwnerAccount from "../hooks/deleteOwnerAccount";
import includeOwnerAccount from "../hooks/includeOwnerAccount";
import includeElement from "../hooks/IncludeElementOfArray";

interface props {
    show: boolean,
    setShow: Function,
    account: AccountInterface;
    setAccount: Function;
    callback: Function,
    setToast: Function,
    setToastMessage: Function
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

const AccountModal = ({show, setShow, account, setAccount, callback, setToast, setToastMessage}: props) => {

    const complex = getLocalStorageComplexData();

    const [deleteShowModal, setDeleteShowModal] = useState(false);

    const [users, setUsers] = useState<Array<UserInterface>>([]);
    const [user, setUser] = useState<UserInterface>(INITIAL_USER);


    const changeAccountData = (key: string, value: any) => {
        setAccount({...account, [key]: value});
    }

    const getAccountUsers = async () => {
        const arrayUsers = JSON.parse(account.users);

        const usersTemp: [] = [];
        for (const userId of arrayUsers) {
            await getUser(userId).then((response) => {
                if (response) {
                    usersTemp.push(response);
                }
            });
        }
        return usersTemp;
    }

    const deleteUserFunction = (user: UserInterface) => {
        setDeleteShowModal(true);
        setUser(user);
    }

    const deleteUser = async () => {
        await deleteUserAccount(account, user).then((response: any) => {
            if (response) {
                setToast(true);
                setToastMessage(response.data);
                account.users = deleteElement(account.users, user.id);

                getAccountUsersRequest();
            }
        })
    }

    const includeOwner = async (user: UserInterface) => {
        await includeOwnerAccount(account, user).then((response: any) => {
            if (response) {
                setToast(true);
                setToastMessage(response.data);
                account.ownersAccount = includeElement(account.ownersAccount, user.id);

                getAccountUsersRequest();
            }
        })
    }

    const deleteOwner = async (user: UserInterface) => {
        await deleteOwnerAccount(account, user).then((response: any) => {
            if (response) {
                setToast(true);
                setToastMessage(response.data);
                account.ownersAccount = deleteElement(account.ownersAccount, user.id);

                getAccountUsersRequest();
            }
        })
    }

    useEffect(() => {
        if (show) {
            if (account.users.length > 0) {
                getAccountUsersRequest();
            }
        } else setUsers([]);
    }, [show]);

    const getAccountUsersRequest = () => {
        getAccountUsers().then(response => {
            setUsers(response);
        });
    }

    const isOwner = (userId: number | null) => {
        if (!userId) return false;

        const arrayUsers = JSON.parse(account.ownersAccount);
        return arrayUsers.includes(userId);
    }

    return (
        <SimpleModalDialog
            title={'Crear Cuenta'}
            show={show}
            setShow={setShow}
            callback={callback}
            closeBtn={null}
            saveBtn={null}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="form">


                        <div className="row">
                            <div className={'col-md-12'}>
                                <div className="form-check form-switch">
                                    <input className="form-check-input float-end success" type="checkbox" role="switch"
                                           id="account-active" checked={(account.active === 1)}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               changeAccountData('active', (e.target.checked) ? 1 : 0)
                                           }}/>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label htmlFor="account-name">Name</label>
                                <input type="text" id={'account-name'} className={'form-control'} value={account.name}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeAccountData('name', e.target.value)}/>
                            </div>
                            <div className="col-md-12 mt-3">
                                <label htmlFor="account-description">Description</label>
                                <textarea id={'account-description'} className={'form-control'}
                                          value={account.description ?? ''}
                                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => changeAccountData('description', e.target.value)}
                                >
                                </textarea>
                            </div>
                        </div>

                        <hr className={'mt-5 mb-5'}/>

                        {users.length > 0 && <div className="row mt-3">
                            <div className="col-md-12">
                                <h5>Owners</h5>
                                <div className="row mb-3">
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" placeholder={'invite an other user by email'}/>
                                    </div>
                                    <div className="col-md-2 d-grid gap-2">
                                        <button className="btn btn-primary">Send</button>
                                    </div>
                                </div>
                                {users.length > 0 && users.map((user: UserInterface) => {
                                    if (user.id !== complex.userId) {
                                        const isAdmin = isOwner(user.id);
                                        const styleButton = isAdmin ? 'btn-warning' : 'btn-secondary';
                                        return (
                                            <div key={user.id} className="row mt-2">
                                                <div className="col-md-8 text-start pt-2">
                                                    <span className={'m-2'}>
                                                        <strong>{user.email}</strong>
                                                    </span>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="d-grid gap-2">
                                                        <button className={'btn ' + styleButton} onClick={() => {
                                                            (isAdmin) ? deleteOwner(user) : includeOwner(user)
                                                        }}>
                                                            {isAdmin ? "Admin" : "No admin"}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="d-grid gap-2">
                                                        <a href="#" className={'btn btn-outline-danger'} onClick={() => deleteUserFunction(user)}>Eliminar</a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                                {users.length == 1 && users[0].id === complex.userId &&
                                <div>No hay usuarios asignados</div>
                                }
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
            <ConfirmModal
                title={"Delete user"}
                message={`Are you sure to delete ${account.name}?`}
                callback={deleteUser}
                show={deleteShowModal}
                setShow={setDeleteShowModal}/>
        </SimpleModalDialog>
    );
}

export default React.memo(AccountModal);
