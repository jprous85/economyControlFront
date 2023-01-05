import {useEffect, useState} from "react";
import GetEconomy from "../hooks/getEconomy";
import {useParams} from "react-router-dom";
import {EconomyInterface, Totals} from "../interfaces/EconomyInterface";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";

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

    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [economy, setEconomy] = useState<EconomyInterface>(ECONOMY_INITIAL);

    const [alert, setAlert] = useState({
        show: false,
        message: ''
    });

    useEffect(() => {
        getEconomyFunction();
    }, [])


    const getEconomyFunction = () => {
        GetEconomy(id).then((response: any) => {
            console.log(response);
            if (response.status === 500) {
                console.log(response);
                setAlert({show: true, message: response.data});
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
    } else {
        return (
            <div className={'col-md-12 mt-4'}>
                {alert.show && <AlertComponent style={'warning'} message={alert.message}/>}
            </div>
        );
    }
}

export default EconomyView;
