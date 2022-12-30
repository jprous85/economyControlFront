import SimpleModalDialog from "../../components/SimpleModalDialog";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {AccountInterface} from "../interfaces/AccountInterface";
import {UserInterface} from "../../User/interfaces/UserInterface";
import getUser from "../../User/hooks/getUser";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

interface props {
    show: boolean,
    setShow: Function,
    account: AccountInterface;
    setAccount: Function;
    callback: Function
}

const AccountModal = ({show, setShow, account, setAccount, callback}: props) => {

    const complex = getLocalStorageComplexData();

    const [users, setUsers] = useState<Array<UserInterface>>([]);

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

    useEffect(() => {
        if (show) {
            if (account.users.length > 0) {
                getAccountUsers().then(response => {
                    setUsers(response);
                });
            }
        } else setUsers([]);
    }, [show]);

    const isOwner = (userId: number | null) => {
        if (!userId) return false;

        const arrayUsers = JSON.parse(account.ownersAccount);
        const value = arrayUsers.includes(userId);
        console.log(userId, value);
        return value;
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

                        <div className="row mt-3 m-1">
                            <div className="col-md-12">
                                <h5>Owners</h5>
                                {users.length > 0 && users.map((user: UserInterface) => {
                                    if (user.id !== complex.userId) {
                                        const isAdmin = isOwner(user.id);
                                        const styleButton = isAdmin ? 'btn-warning' : 'btn-secondary';
                                        return (
                                            <div key={user.id} className="row mt-2">
                                                <div className="col-md-8 bg-light text-start pt-2">
                                                    <strong>{user.email}</strong>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="d-grid gap-2">
                                                        <button className={'btn ' + styleButton}>
                                                            {isAdmin ? "Es admin" : "No admin"}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="d-grid gap-2">
                                                        <a href="#" className={'btn btn-outline-danger'}>Eliminar</a>
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
                        </div>

                    </div>
                </div>
            </div>
        </SimpleModalDialog>
    );
}

export default React.memo(AccountModal);
