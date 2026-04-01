import BaseLayout from "../../Shared/layouts/baseLayout";
import {UserInterface} from "../interfaces/UserInterface";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro';
import Loading from "../../components/Loading";
import UsersTable from "../components/UsersTable";
import UserModal from "../components/UserModal";
import {useCallback, useContext, useState} from "react";
import createUser from "../hooks/createUser";
import getAllUsers from "../hooks/getAllUsers";
import uuid from "react-uuid";
import updateUser from "../hooks/updateUser";
import ToastComponent from "../../components/ToastComponent";
import 'bootstrap';
import ConfirmModal from "../../components/ConfirmModal";
import deleteUser from "../hooks/deleteUser";
import {useTranslation} from "react-i18next";
import {ThemeContext} from "../../context/themeContext";

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

    const {t} = useTranslation();
    const themeContext = useContext(ThemeContext);

    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [createOrUpdateShowModal, setCreateOrUpdateShowModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);

    const [user, setUser] = useState<UserInterface>(INITIAL_USER);
    const [userFunction, setUserFunction] = useState<any>(() => {});

    const createNewUser = (user: UserInterface) => {
        createUser(user).then((createResponse: any) => {
            if (createResponse) {
                setToastMessage(createResponse.data);
                getAllUsers().then((response: any) => {
                    setUsers(response);
                    setToast(true);
                });
            }
        });
    }

    const updateOldUser = (user: UserInterface) => {
        updateUser(user).then((updateResponse: any) => {
            if (updateResponse) {
                setToastMessage(updateResponse.data);
                getAllUsers().then((response: any) => {
                    setUsers(response);
                    setToast(true);
                });
            }
        });
    }

    const deleteSelectedUser = (user: UserInterface) => {
        deleteUser(user).then((deleteResponse: any) => {
            if (deleteResponse) {
                setToastMessage(deleteResponse.data);
                getAllUsers().then((response: any) => {
                    setUsers(response);
                    setToast(true);
                });
            }
        });
    }

    const resetUserValues = () => {
        setUser(INITIAL_USER);
        setCreateOrUpdateShowModal(true);
        assignUserFunction(() => createNewUser);
    }

    const updateUserFunction = useCallback(() => {
        setCreateOrUpdateShowModal(true);
        assignUserFunction(() => updateOldUser);
    }, [createOrUpdateShowModal]);

    const deleteUserFunction = useCallback(() => {
        setDeleteShowModal(true);
        assignUserFunction(() => deleteSelectedUser);
    }, [deleteShowModal]);

    const assignUserFunction = (callback: Function) => setUserFunction(callback);
    const dispatchFunction = () => userFunction(user);

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <BaseLayout>
            <div className="px-3 px-md-5 mt-4 mb-5 w-100">

                {/* Page header */}
                <div className={`d-flex justify-content-between align-items-end pb-3 mb-4 ${themeContext.theme}-page-header`}>
                    <div>
                        <h4 className={`${themeContext.theme}-text fw-bold mb-0`}>Usuarios</h4>
                        <small className="text-muted">{users.length} usuario{users.length !== 1 ? 's' : ''}</small>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={resetUserValues}>
                        <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} className="me-2"/>
                        {t('users.create.btnIncludeUser')}
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4" style={{maxWidth: 360}}>
                    <div className="input-group input-group-sm">
                        <span className={`input-group-text bg-transparent ${themeContext.theme}-category-panel`}
                              style={{border: '1px solid rgba(128,128,128,0.2)', borderRight: 'none'}}>
                            <FontAwesomeIcon icon={icon({name: 'magnifying-glass', style: 'solid'})} className="text-muted"/>
                        </span>
                        <input
                            type="text"
                            className={`form-control ${themeContext.theme}-modal-input`}
                            style={{border: '1px solid rgba(128,128,128,0.2)', borderLeft: 'none'}}
                            placeholder="Buscar por nombre o email..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => setSearch('')}>
                                <FontAwesomeIcon icon={icon({name: 'xmark', style: 'solid'})}/>
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                {loading && users.length === 0
                    ? <Loading/>
                    : <UsersTable
                        users={filtered}
                        setUser={setUser}
                        updateUserFunction={updateUserFunction}
                        deleteUserFunction={deleteUserFunction}
                    />
                }

            </div>

            <UserModal
                user={user}
                setUser={setUser}
                callback={dispatchFunction}
                show={createOrUpdateShowModal}
                setShow={setCreateOrUpdateShowModal}
            />
            <ConfirmModal
                title={"Eliminar usuario"}
                message={`¿Seguro que quieres eliminar a ${user.name}?`}
                callback={dispatchFunction}
                show={deleteShowModal}
                setShow={setDeleteShowModal}
                saveBtn={null}
                closeBtn={null}
            />
            <ToastComponent show={toast} setShow={setToast} title={'Users'} message={toastMessage}/>
        </BaseLayout>
    );
}

export default UserView;
