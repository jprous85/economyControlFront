import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";
import {useTranslation} from "react-i18next";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import GetAccountByUuid from "../../Account/hooks/getAccountByUuid";
import IncomesComponent from "../components/IncomesComponent";
import ToastComponent from "../../components/ToastComponent";
import ResultEconomyBox from "../components/ResultEconomyBox";
import InformationEconomyBox from "../components/InformationEconomyBox";
import BlockSeparator from "../components/BlockSeparator";
import SpentGroupComponent from "../components/SpentComponent";
import GetEconomyWithCategoriesGroup from "../hooks/getEconomyWithCategoriesGroup";

const ACCOUNT_INITIAL = {
    "id": null,
    "uuid": null,
    "name": "",
    "description": "",
    "users": "",
    "ownersAccount": "",
    "active": 0,
    "created_at": "",
    "updated_at": ""
}

const ECONOMY_INITIAL = {
    "id": null,
    "start_month": '',
    "end_month": '',
    "account_id": 0,
    "economic_management": {
        "incomes": [],
        "expenses": [],
        "totals": {
            "totalIncomes": 0,
            "totalPaid": 0,
            "pendingToPay": 0,
            "totalExpenses": 0,
            "balance": 0
        }
    },
    "active": 0,
    "created_at": '',
    "updated_at": ''
};

const INCOME = {
    "uuid": null,
    "name": '',
    "category": '',
    "amount": 0,
    "fixed": false,
    "active": true
}

const SPENT = {
    "uuid": null,
    "name": '',
    "category": '',
    "amount": 0,
    "paid": false,
    "fixed": false,
    "active": true
}

const EconomyView = () => {

    const {uuid} = useParams();
    const {t} = useTranslation('', {keyPrefix: 'economy.view'});

    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<AccountInterface>(ACCOUNT_INITIAL);
    const [economy, setEconomy] = useState<EconomyInterface>(ECONOMY_INITIAL);

    const [income, setIncome] = useState<Incomes>(INCOME)
    const [spent, setSpent] = useState<Expenses>(SPENT)


    const [alert, setAlert] = useState({
        show: false,
        message: ''
    });

    useEffect(() => {
        getAccountFunction();
        getEconomyFunction();
    }, [])

    const getAccountFunction = () => {
        GetAccountByUuid(uuid).then((response: any) => {
            if (response.data.status === 404) {
                setAlert({
                    show: true,
                    message: response.data.status === 404 ? response.data.message : ''
                });
                setLoading(false);
            }
            if (response.status === 200) {
                setAccount(response.data);
            }
        });

    }

    const getEconomyFunction = () => {
        GetEconomyWithCategoriesGroup(uuid).then((response: any) => {
            if (response.data.status === 404) {
                setAlert({
                    show: true,
                    message: response.data.status === 404 ? response.data.message : ''
                });
                setLoading(false);
            }
            if (response.status === 200) {
                setEconomy(response.data);
                setLoading(false);
            }
        })
    }

    if (loading) {
        return <Loading/>
    } else if (alert.show) {
        return (
            <div className="row">
                <div className="col-md-12 mt-4">
                    <AlertComponent style={'warning'} message={alert.message}/>
                </div>
            </div>
        );
    } else if (account.uuid && economy.id) {
        return (
            <div className={'col-md-12 mt-4 mb-5 ps-5 pe-5'}>
                <div className="row">
                    <div className="col-md-7 mb-4">
                        <InformationEconomyBox account={account} economy={economy}/>
                    </div>
                    <div className="col-md-5 mb-4">
                        <ResultEconomyBox economy={economy}/>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <BlockSeparator title={'Incomes'}/>
                            <IncomesComponent
                                getEconomyFunction={getEconomyFunction}
                                account={account}
                                economy={economy}
                                setToast={setToast}
                                setToastMessage={setToastMessage}
                                income={income}
                                setIncome={setIncome}
                            />
                        </div>
                        <div className="col-md-12">
                            <BlockSeparator title={'Spent'} />
                            <SpentGroupComponent
                                getEconomyFunction={getEconomyFunction}
                                account={account}
                                economy={economy}
                                setToast={setToast}
                                setToastMessage={setToastMessage}
                                spent={spent}
                                setSpent={setSpent}
                            />
                        </div>
                    </div>
                </div>
                <ToastComponent show={toast} setShow={setToast} title={'Users'} message={toastMessage}/>
            </div>
        );
    } else return null;
}

export default EconomyView;
