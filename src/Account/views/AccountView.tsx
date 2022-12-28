import {Button, Card, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import getOwnerAccounts from "../hooks/getOwnerAccounts";
import getAllAccounts from "../hooks/getAllAccounts";
import IsAdmin from "../../Shared/utils/isAdmin";
import {AccountInterface} from "../interfaces/AccountInterface";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

const INITIAL_ACCOUNT = {
    "id": null,
    "name": "",
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
    const [accounts, setAccounts] = useState<Array<AccountInterface>>([]);

    useEffect(() => {
        if (IsAdmin()) {
            getAccounts();
        } else {
            getAccountsByUser();
        }
        console.log(complex);
    }, []);

    const getAccounts = () => {
        getAllAccounts().then((accountResponse: any) => {
            if (accountResponse) {
                setAccounts(accountResponse.data);
                setLoading(false);
            }
        });
    }

    const getAccountsByUser = () => {
        getOwnerAccounts().then((accountResponse: any) => {
            if (accountResponse) {
                setAccounts(accountResponse.data);
                setLoading(false);
            }
        });
    }

    const dropdownMenuOptions = () => {
        return (
            <DropdownButton
                align="end"
                variant="secondary"
                title={<FontAwesomeIcon icon={icon({name: "ellipsis-vertical"})} />}
                id="dropdown-menu-align-end"
            >
                <Dropdown.Item eventKey="1">{t('accounts.view.editBtnAccount')}</Dropdown.Item>
                <Dropdown.Item eventKey="2">{t('accounts.view.duplicateBtnAccount')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">{t('accounts.view.deleteBtnAccount')}</Dropdown.Item>
            </DropdownButton>
       );
    }

    if (!loading && accounts.length > 0) {
        return (
            <Row>
                <Col md={12} className={'text-end mt-4'}>
                    <Button variant="primary">{t('accounts.view.newBtnAccount')}</Button>
                </Col>
                <Col md={12} className={'mt-4'}>
                    <Container>
                        <Row>
                            {accounts.map((account: AccountInterface) => {

                                const users = (JSON.parse(account.users));
                                const owners = (JSON.parse(account.ownersAccount));

                                let dropdownMenu = null;
                                if (owners.includes(complex.userId)) {
                                    dropdownMenu = dropdownMenuOptions();
                                }

                                return (
                                    <Col key={account.id} sm={3} className={'mb-3'}>
                                        <Card className={'p-2'}>
                                            <Card.Title className={'d-flex justify-content-between'}>
                                                <a href={`/economy/${account.id}`}>{account.name}</a>
                                                {dropdownMenu}
                                            </Card.Title>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </Col>
            </Row>
        );
    } else {
        return <Loading/>
    }
}


export default AccountView;
