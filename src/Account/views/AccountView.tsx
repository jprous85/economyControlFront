import {Accordion, Button, Card, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useState} from "react";
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
import AlertComponent from "../../components/Alert";

const INITIAL_ACCOUNT = {
    "id": null,
    "name": "",
    "description": "",
    "users": "",
    "ownersAccount": "",
    "active": 0,
    "created_at": "",
    "updated_at": ""
}

const AccountView = () => {

    const {t} = useTranslation();

    const complex = getLocalStorageComplexData();

    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState({
        show: false,
        message: ''
    });

    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [createOrUpdateShowModal, setCreateOrUpdateShowModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);

    const [accounts, setAccounts] = useState<Array<AccountInterface>>([]);
    const [account, setAccount] = useState<AccountInterface>(INITIAL_ACCOUNT);

    const [customFunction, setCustomFunction] = useState<any>(() => {
    });


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
        assignFunction(() => createNewAccount)
    }

    const updateAccountFunction = useCallback((account: AccountInterface) => {
        setAccount(account);
        setCreateOrUpdateShowModal(true);
        assignFunction(() => updateOldAccount);
    }, [createOrUpdateShowModal]);

    const deleteAccountFunction = useCallback((account: AccountInterface) => {
        setAccount(account);
        setDeleteShowModal(true);
        assignFunction(() => deleteSelectedAccount);
    }, [deleteShowModal])

    const assignFunction = (callback: Function) => {
        setCustomFunction(callback);
    }

    const dispatchFunction = () => {
        customFunction(account);
    };

    useEffect(() => {
        getAccountsRequest();
    }, []);

    const getAccountsRequest = () => {
        if (IsAdmin()) {
            getAccounts();
        } else {
            getAccountsByUser();
        }
    }

    const getAccounts = () => {
        getAllAccounts().then((accountResponse: any) => {
            assignAccounts(accountResponse);
        });
    }

    const getAccountsByUser = () => {
        getOwnerAccounts().then((accountResponse: any) => {
            assignAccounts(accountResponse);
        });
    }

    const assignAccounts = (accountResponse: any) => {
        if (accountResponse) {
            setAlert({
                show: accountResponse.data.length === 0,
                message: accountResponse.data.length === 0 ? 'No hay cuentas creadas' : ''
            });
            setAccounts(accountResponse.data);
            setLoading(false);
        }
    }

    const dropdownMenuOptions = (account: AccountInterface) => {
        return (
            <DropdownButton
                align="end"
                variant="secondary"
                title={<FontAwesomeIcon icon={icon({name: "ellipsis"})}/>}
                id="dropdown-menu-align-end"
            >
                <Dropdown.Item eventKey="1"
                               onClick={() => updateAccountFunction(account)}>{t('accounts.view.editBtnAccount')}</Dropdown.Item>
                <Dropdown.Item eventKey="2">{t('accounts.view.duplicateBtnAccount')}</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item eventKey="4"
                               onClick={() => deleteAccountFunction(account)}>{t('accounts.view.deleteBtnAccount')}</Dropdown.Item>
            </DropdownButton>
        );
    }

    if (!loading) {
        return (
            <Row className={'ps-5 pe-4'}>
                <Col md={12} className={'text-end mt-4'}>
                    <Button variant="primary"
                            onClick={() => resetAccountValues()}>{t('accounts.view.newBtnAccount')}</Button>
                </Col>
                <Col md={12} className={'mt-4'}>
                    {alert.show && <AlertComponent style={'warning'} message={alert.message}/>}
                    <Row>
                        {accounts.map((account: AccountInterface) => {

                            const users = (JSON.parse(account.users));
                            const owners = (JSON.parse(account.ownersAccount));

                            let dropdownMenu = null;
                            if (owners.includes(complex.userId)) {
                                dropdownMenu = dropdownMenuOptions(account);
                            }

                            return (
                                <Col key={account.id} sm={3} className={'mb-3'}>
                                    <Card className={'p-2'}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={12} className={'d-flex justify-content-between'}>
                                                    <a href={`/economy/${account.id}`}>{account.name}</a>
                                                    {dropdownMenu}
                                                </Col>
                                                <Col md={12} className={'mt-3'}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>Description</Accordion.Header>
                                                            <Accordion.Body>
                                                                {account.description ?? '---'}
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
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
                    title={"Delete user"}
                    message={`Are you sure to delete ${account.name}?`}
                    callback={dispatchFunction}
                    show={deleteShowModal}
                    setShow={setDeleteShowModal}/>
                <ToastComponent show={toast} setShow={setToast} title={'Users'} message={toastMessage}/>
            </Row>
        );
    } else {
        return <Loading/>
    }
}


export default AccountView;