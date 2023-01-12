import {useEffect, useState} from "react";
import GetEconomy from "../hooks/getEconomy";
import {useParams} from "react-router-dom";
import {EconomyInterface, Totals} from "../interfaces/EconomyInterface";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";
import {useTranslation} from "react-i18next";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import GetAccountByUuid from "../../Account/hooks/getAccountByUuid";

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
            "pendingToPay": 0
        }
    },
    "active": 0,
    "created_at": '',
    "updated_at": ''
};

const EconomyView = () => {

    const {uuid} = useParams();
    const {t} = useTranslation('', {keyPrefix: 'economy.view'});

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<AccountInterface>(ACCOUNT_INITIAL);
    const [economy, setEconomy] = useState<EconomyInterface>(ECONOMY_INITIAL);

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
                console.log(response);
                setAlert({
                    show: true,
                    message: response.data.status === 404 ? response.data.message : ''
                });
                setLoading(false);
            }
            if (response.status === 200) {
                setEconomy(response.data);
            }
        });

    }

    const getEconomyFunction = () => {
        GetEconomy(uuid).then((response: any) => {
            console.log(response);
            if (response.data.status === 404) {
                console.log(response);
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
    } else {
        return (
            <div className={'col-md-12 mt-4'}>
                <div className="col-md-12 text-end">
                    <a href="#" className={'btn btn-primary'} onClick={() => {
                    }}>{t('newBtnEconomy')}</a>
                </div>
                <div className="col-md-12 pb-4">
                    <label>Falta por pagar:</label>
                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={100}
                         aria-valuemin={0} aria-valuemax={100}>
                        <div className={"progress-bar progress-bar-striped progress-bar-animated"}
                             style={{width: 100}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            incomes
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            spends
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EconomyView;
