import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import GetAccountByUuid from "../../Account/hooks/getAccountByUuid";
import IncomesComponent from "../components/IncomesComponent";
import ToastComponent from "../../components/ToastComponent";
import ResultEconomyBox from "../components/ResultEconomyBox";
import InformationEconomyBox from "../components/InformationEconomyBox";
import SpentGroupComponent from "../components/SpentComponent";
import GetEconomyWithCategoriesGroup from "../hooks/getEconomyWithCategoriesGroup";
import {ThemeContext} from "../../context/themeContext";
import EconomyCharts from "../components/EconomyCharts";
import getOwnerAccounts from "../../Account/hooks/getOwnerAccounts";
import getAllAccounts from "../../Account/hooks/getAllAccounts";
import IsAdmin from "../../Shared/utils/isAdmin";

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
    const navigate = useNavigate();
const themeContext = useContext(ThemeContext);
    const isDark = themeContext.theme === 'dark';

    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<AccountInterface>(ACCOUNT_INITIAL);
    const [economy, setEconomy] = useState<EconomyInterface>(ECONOMY_INITIAL);
    const [accounts, setAccounts] = useState<AccountInterface[]>([]);

    const [income, setIncome] = useState<Incomes>(INCOME)
    const [spent, setSpent] = useState<Expenses>(SPENT)

    const [alert, setAlert] = useState({show: false, message: ''});

    useEffect(() => {
        setLoading(true);
        getAccountFunction();
        getEconomyFunction();
        loadAllAccounts();
    }, [uuid])

    const loadAllAccounts = () => {
        const fetcher = IsAdmin() ? getAllAccounts : getOwnerAccounts;
        fetcher().then((r: any) => {
            if (r && r.data) setAccounts(r.data);
        });
    }

    const getAccountFunction = () => {
        GetAccountByUuid(uuid).then((response: any) => {
            if (response.data.status === 404) {
                setAlert({show: true, message: response.data.message ?? ''});
                setLoading(false);
            }
            if (response.status === 200) setAccount(response.data);
        });
    }

    const getEconomyFunction = () => {
        GetEconomyWithCategoriesGroup(uuid).then((response: any) => {
            if (response.data.status === 404) {
                setAlert({show: true, message: response.data.message ?? ''});
                setLoading(false);
            }
            if (response.status === 200) {
                setEconomy(response.data);
                setLoading(false);
            }
        })
    }

    if (loading) return <Loading/>;

    if (alert.show) {
        return (
            <div className="row">
                <div className="col-md-12 mt-4">
                    <AlertComponent style={'warning'} message={alert.message}/>
                </div>
            </div>
        );
    }

    if (!account.uuid || !economy.id) return null;

    const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    const activePillBg = isDark ? 'rgba(67,97,238,0.25)' : 'rgba(67,97,238,0.12)';
    const activePillColor = '#4361ee';
    const inactivePillColor = isDark ? 'rgba(255,255,255,0.5)' : '#6c757d';

    return (
        <div className="mb-5 px-3 px-md-5">

            {/* Account switcher */}
            {accounts.length > 1 && (
                <div
                    className="d-flex gap-2 pb-3 mb-2 mt-3"
                    style={{overflowX: 'auto', scrollbarWidth: 'none'}}
                >
                    {accounts.map((acc: AccountInterface) => {
                        const isActive = acc.uuid === uuid;
                        return (
                            <button
                                key={acc.uuid}
                                onClick={() => navigate(`/economy/${acc.uuid}`)}
                                style={{
                                    flexShrink: 0,
                                    padding: '4px 14px',
                                    borderRadius: 20,
                                    border: `1px solid ${isActive ? activePillColor : borderColor}`,
                                    background: isActive ? activePillBg : 'transparent',
                                    color: isActive ? activePillColor : inactivePillColor,
                                    fontWeight: isActive ? 700 : 400,
                                    fontSize: '0.78rem',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {acc.name}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Page header — account info + stat strip, no cards */}
            <div className={`py-4 mb-4 ${themeContext.theme}-page-header`}>
                <div className="row align-items-center g-3">
                    <div className="col-12 col-md-6">
                        <InformationEconomyBox account={account} economy={economy}/>
                    </div>
                    <div className="col-12 col-md-6">
                        <ResultEconomyBox economy={economy}/>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <EconomyCharts economy={economy}/>

            {/* Main content — two columns side by side */}
            <div className="row g-4">
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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

            <ToastComponent show={toast} setShow={setToast} title={'Economy'} message={toastMessage}/>
        </div>
    );
}

export default EconomyView;
