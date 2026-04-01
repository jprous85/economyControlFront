import {Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {memo, useCallback, useContext, useEffect, useState} from "react";
import getOwnerAccounts from "../hooks/getOwnerAccounts";
import getAllAccounts from "../hooks/getAllAccounts";
import IsAdmin from "../../Shared/utils/isAdmin";
import {AccountInterface} from "../interfaces/AccountInterface";
import Loading from "../../components/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro';
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";
import ConfirmModal from "../../components/ConfirmModal";
import ToastComponent from "../../components/ToastComponent";
import createAccount from "../hooks/createAccount";
import updateAccount from "../hooks/updateAccount";
import deleteAccount from "../hooks/deleteAccount";
import AccountModal from "../components/AccountModal";
import {ThemeContext} from "../../context/themeContext";
import duplicateAccount from "../hooks/duplicateAccount";
import formatDate from "../../Shared/utils/formatDate";

const INITIAL_ACCOUNT = {
    "id": null,
    "uuid": null,
    "name": "",
    "description": "",
    "users": "",
    "ownersAccount": "",
    "active": 1,
    "created_at": "",
    "updated_at": ""
}

const AccountView = () => {

    const themeContext = useContext(ThemeContext);
    const {t} = useTranslation();
    const complex = getLocalStorageComplexData();

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [createOrUpdateShowModal, setCreateOrUpdateShowModal] = useState(false);
    const [duplicateShowModal, setDuplicateShowModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);

    const [accounts, setAccounts] = useState<Array<AccountInterface>>([]);
    const [account, setAccount] = useState<AccountInterface>(INITIAL_ACCOUNT);
    const [customFunction, setCustomFunction] = useState<any>(() => {});

    const createNewAccount = (account: AccountInterface) => {
        createAccount(account).then((createResponse: any) => {
            if (createResponse) {
                setToastMessage(createResponse.data);
                getAccountsRequest();
                setToast(true);
            }
        })
    }

    const updateOldAccount = (account: AccountInterface) => {
        updateAccount(account).then((updateResponse: any) => {
            if (updateResponse) {
                setToastMessage(updateResponse.data);
                getAccountsRequest();
                setToast(true);
            }
        });
    }

    const duplicateMainAccount = (account: AccountInterface) => {
        duplicateAccount(account).then((updateResponse: any) => {
            if (updateResponse) {
                setToastMessage(updateResponse.data);
                getAccountsRequest();
                setToast(true);
            }
        });
    }

    const deleteSelectedAccount = (account: AccountInterface) => {
        deleteAccount(account).then((deleteResponse: any) => {
            if (deleteResponse) {
                setToastMessage(deleteResponse.data);
                getAccountsRequest();
                setToast(true);
            }
        });
    }

    const resetAccountValues = () => {
        setAccount(INITIAL_ACCOUNT);
        setCreateOrUpdateShowModal(true);
        assignFunction(() => createNewAccount);
    }

    const updateAccountFunction = useCallback((account: AccountInterface) => {
        setAccount(account);
        setCreateOrUpdateShowModal(true);
        assignFunction(() => updateOldAccount);
    }, [createOrUpdateShowModal]);

    const duplicateAccountFunction = useCallback((account: AccountInterface) => {
        setAccount(account);
        setDuplicateShowModal(true);
        assignFunction(() => duplicateMainAccount);
    }, [createOrUpdateShowModal]);

    const deleteAccountFunction = useCallback((account: AccountInterface) => {
        setAccount(account);
        setDeleteShowModal(true);
        assignFunction(() => deleteSelectedAccount);
    }, [deleteShowModal]);

    const assignFunction = (callback: Function) => setCustomFunction(callback);
    const dispatchFunction = () => customFunction(account);

    useEffect(() => {
        getAccountsRequest();
    }, []);

    const getAccountsRequest = () => {
        if (IsAdmin()) {
            getAllAccounts().then((r: any) => assignAccounts(r));
        } else {
            getOwnerAccounts().then((r: any) => assignAccounts(r));
        }
    }

    const assignAccounts = (accountResponse: any) => {
        if (accountResponse) {
            setAccounts(accountResponse.data);
            setLoading(false);
        }
    }

    const filtered = accounts.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    const dropdownMenuOptions = (account: AccountInterface) => (
        <DropdownButton
            align="end"
            variant="none"
            title={
                <FontAwesomeIcon className={`${themeContext.theme}-text`}
                                 icon={icon({name: "ellipsis"})}/>
            }
            id={`dropdown-${account.id}`}
        >
            <Dropdown.Item onClick={() => updateAccountFunction(account)}>
                {t('accounts.view.editBtnAccount')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => duplicateAccountFunction(account)}>
                {t('accounts.view.duplicateBtnAccount')}
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item className="text-danger" onClick={() => deleteAccountFunction(account)}>
                {t('accounts.view.deleteBtnAccount')}
            </Dropdown.Item>
        </DropdownButton>
    );

    if (loading) return <Loading/>;

    return (
        <div className="px-3 px-md-5 mt-4 mb-5">

            {/* Page header */}
            <div className={`d-flex justify-content-between align-items-end pb-3 mb-4 ${themeContext.theme}-page-header`}>
                <div>
                    <h4 className={`${themeContext.theme}-text fw-bold mb-0`}>Cuentas</h4>
                    <small className="text-muted">{accounts.length} cuenta{accounts.length !== 1 ? 's' : ''}</small>
                </div>
                <button className="btn btn-primary btn-sm" onClick={resetAccountValues}>
                    <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} className="me-2"/>
                    Nueva cuenta
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
                        placeholder="Buscar cuenta..."
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

            {/* Grid */}
            <Row className="g-3">
                {filtered.length === 0 && (
                    <Col xs={12}>
                        <div className="text-center py-5">
                            <FontAwesomeIcon
                                icon={icon({name: 'folder-open', style: 'solid'})}
                                size="2x"
                                className="text-muted mb-3"
                            />
                            <p className={`${themeContext.theme}-text mb-1`}>
                                {search ? 'No se encontraron cuentas' : 'No tienes cuentas aún'}
                            </p>
                            {search
                                ? <button className="btn btn-link text-muted p-0" style={{fontSize: '0.85rem'}} onClick={() => setSearch('')}>Limpiar búsqueda</button>
                                : <button className="btn btn-link p-0" style={{fontSize: '0.85rem'}} onClick={resetAccountValues}>Crear la primera cuenta</button>
                            }
                        </div>
                    </Col>
                )}

                {filtered.map((account: AccountInterface) => {
                    const users = JSON.parse(account.users) as any[];
                    const owners = JSON.parse(account.ownersAccount) as any[];
                    const isShared = users.length > 1;
                    const canManage = owners.includes(complex.userId) || IsAdmin();

                    return (
                        <Col key={account.id} xs={12} sm={6} md={4} lg={3}>
                            <div
                                className={`${themeContext.theme}-category-panel h-100 d-flex flex-column`}
                                style={{transition: 'box-shadow 0.15s'}}
                            >
                                {/* Card top */}
                                <div className="p-3 flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <a
                                            href={`/economy/${account.uuid}`}
                                            className={`${themeContext.theme}-link fw-bold`}
                                            style={{fontSize: '0.95rem', textDecoration: 'none', lineHeight: 1.3}}
                                        >
                                            {account.name}
                                        </a>
                                        {canManage && dropdownMenuOptions(account)}
                                    </div>

                                    {/* Description — always visible, 2-line clamp */}
                                    <p
                                        className="text-muted mb-0"
                                        style={{
                                            fontSize: '0.8rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical' as any,
                                            overflow: 'hidden',
                                            minHeight: '2.4em',
                                            lineHeight: 1.5
                                        }}
                                    >
                                        {account.description || 'Sin descripción'}
                                    </p>
                                </div>

                                {/* Card footer */}
                                <div
                                    className="d-flex align-items-center justify-content-between px-3 py-2"
                                    style={{borderTop: '1px solid rgba(128,128,128,0.1)'}}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                                        {isShared && (
                                            <span className="badge bg-warning text-dark" style={{fontSize: '0.65rem'}}>Compartida</span>
                                        )}
                                        {!account.active && (
                                            <span className="badge bg-secondary" style={{fontSize: '0.65rem'}}>Inactiva</span>
                                        )}
                                        <span className="text-muted" style={{fontSize: '0.72rem'}}>
                                            <FontAwesomeIcon icon={icon({name: 'user', style: 'solid'})} style={{width: 10}} className="me-1"/>
                                            {users.length}
                                        </span>
                                    </div>
                                    <span className="text-muted" style={{fontSize: '0.68rem'}}>
                                        {formatDate(account.created_at)}
                                    </span>
                                </div>
                            </div>
                        </Col>
                    );
                })}

                {/* Add-new card */}
                <Col xs={12} sm={6} md={4} lg={3}>
                    <div
                        className={`${themeContext.theme}-category-panel h-100 d-flex flex-column align-items-center justify-content-center text-muted`}
                        style={{
                            minHeight: 130,
                            cursor: 'pointer',
                            border: '2px dashed rgba(128,128,128,0.25)',
                            background: 'transparent',
                            borderRadius: 8,
                            transition: 'opacity 0.15s'
                        }}
                        onClick={resetAccountValues}
                    >
                        <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} size="lg" className="mb-2"/>
                        <span style={{fontSize: '0.8rem'}}>Nueva cuenta</span>
                    </div>
                </Col>
            </Row>

            <AccountModal
                account={account}
                setAccount={setAccount}
                callback={dispatchFunction}
                show={createOrUpdateShowModal}
                setShow={setCreateOrUpdateShowModal}
                setToast={setToast}
                setToastMessage={setToastMessage}
            />
            <ConfirmModal
                title={"Duplicar cuenta"}
                message={`¿Duplicar la cuenta "${account.name}"?`}
                callback={dispatchFunction}
                show={duplicateShowModal}
                setShow={setDuplicateShowModal}
                saveBtn={'Duplicar'}
                closeBtn={null}
            />
            <ConfirmModal
                title={"Eliminar cuenta"}
                message={`¿Seguro que quieres eliminar "${account.name}"?`}
                callback={dispatchFunction}
                show={deleteShowModal}
                setShow={setDeleteShowModal}
                saveBtn={null}
                closeBtn={null}
            />
            <ToastComponent show={toast} setShow={setToast} title={'Accounts'} message={toastMessage}/>
        </div>
    );
}

export default memo(AccountView);
