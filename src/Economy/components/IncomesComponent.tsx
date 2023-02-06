import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";
import createIncome from "../hooks/createIncome";
import React, {memo, useContext, useState} from "react";
import IncomeModalComponent from "./IncomeModal";
import uuid from "react-uuid";
import deleteIncome from "../hooks/deleteIncome";
import ConfirmModal from "../../components/ConfirmModal";
import updateIncome from "../hooks/updateIncome";
import updateFixedStatus from "../hooks/updateFixedStatus";
import TooltipOverlay from "../../components/TooltipOverlay";
import {ThemeContext} from "../../context/themeContext";
import IsAdmin from "../../Shared/utils/isAdmin";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

const INCOME = {
    "uuid": '',
    "name": '',
    "amount": 0,
    "fixed": false,
    "active": true
}

interface props {
    getEconomyFunction: Function;
    account: AccountInterface;
    economy: EconomyInterface;
    setToast: Function;
    setToastMessage: Function;
    income: Incomes;
    setIncome: Function;
}

const IncomesGroupComponent = (
    {
        getEconomyFunction,
        account,
        economy,
        setToast,
        setToastMessage,
        income,
        setIncome,
    }: props) => {

    const themeContext = useContext(ThemeContext);
    const localStorage = getLocalStorageComplexData();

    const admin = IsAdmin();
    const isOwner = account.ownersAccount.includes(localStorage.userId);

    const [showIncomeModal, setShowIncomeModal] = useState(false);

    const [deleteShowModal, setDeleteShowModal] = useState(false);

    const [customFunction, setCustomFunction] = useState<any>(() => {
    });

    const [incomes] = useState<any>(economy.economic_management.incomes);

    const createNewIncome = (economy: EconomyInterface, income: Incomes) => {
        createIncome(economy, income).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                incomes.push(income);
                getEconomyFunction();
            }
        })
    }

    const updateIncomeFunction = (economy: EconomyInterface, income: Incomes) => {
        updateIncome(economy, income).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);

                incomes.map((incomeCore: Incomes, index: number) => {
                    if (incomeCore.uuid === income.uuid) {
                        incomes[index] = income;
                    }
                });
                getEconomyFunction();
            }
        })
    }

    const updateFixedStatusFunction = (economy: EconomyInterface, income: Incomes, field: string) => {
        updateFixedStatus(economy, income, field).then((updateResponse: any) => {
            if (updateResponse) {
                setToast(true);
                setToastMessage(updateResponse.data);

                incomes.map((incomeCore: Incomes, index: number) => {
                    if (incomeCore.uuid === income.uuid) {
                        incomes[index] = income;
                    }
                });
                getEconomyFunction();
            }
        })
    }

    const deleteIncomeFunction = (economy: EconomyInterface, income: Incomes) => {
        deleteIncome(economy, income).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                const index = incomes.indexOf(income);
                if (index > -1) { // only splice array when item is found
                    incomes.splice(index, 1); // 2nd parameter means remove one item only
                }
                getEconomyFunction();
            }
        })
    }

    const changeFixedData = (income: Incomes, key: string, value: any) => {
        income.fixed = value;
        updateFixedStatusCallback(income);
    }

    const createEmptyIncome = () => {
        INCOME.uuid = uuid();
        setIncome(INCOME);
        setShowIncomeModal(true);
        assignFunction(() => createNewIncome)
    }

    const updateOldIncome = (income: Incomes) => {
        setIncome(income);
        setShowIncomeModal(true);
        assignFunction(() => updateIncomeFunction);
    }

    const updateFixedStatusCallback = (income: Incomes) => {
        setIncome(income);
        updateFixedStatusFunction(economy, income, 'incomes');
    }

    const deleteSelectedIncome = (income: Incomes) => {
        setIncome(income);
        setDeleteShowModal(true);
        assignFunction(() => deleteIncomeFunction);
    }


    const dispatchFunction = () => {
        customFunction(economy, income);
    }

    const assignFunction = (callback: Function) => {
        setCustomFunction(callback);
    }


    const showIncomes = () => {
        if (incomes.length === 0) return null;

        return (
            Array.from(incomes).map((income: any, index: number) => {
                return (
                    <div className={'row mb-2'} key={index}>
                        {pinButtonChangeStatusOfFixed(income, index)}
                        <div className={`col-7 ${themeContext.theme}-text`}><strong>{income.name}</strong></div>
                        <div className={`col-6 col-sm-2 text-end ${themeContext.theme}-text`}><strong>{income.amount} €</strong></div>
                        <div className="col-md-2 col-sm-12">{menuActionOptions(income)}</div>
                        <hr className={'mt-3'}/>
                    </div>
                )
            })
        );
    }

    const menuActionOptions = (income: Incomes) => {

        if (!isOwner) return null;

        return (
            <div className={'row'}>
                <div className="col-6 text-center">
                    <a href="#"
                       className={`btn btn-warning text-end`}
                       onClick={() => updateOldIncome(income)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                    </a>
                </div>
                <div className="col-6 text-center">
                    <a href="#"
                       className={`btn btn-outline-danger text-end`}
                       onClick={() => deleteSelectedIncome(income)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})}/>
                    </a>
                </div>
            </div>
        );
    }

    const pinButtonChangeStatusOfFixed = (income: Incomes, index: number) => {
        if (!isOwner) return null;

        const colorPin = (income.fixed) ? themeContext.theme+'-pin-able' : themeContext.theme+'-pin-unable';

        return (
            <div className="col-12 col-sm-1 text-md-center text-sm-start">
                <TooltipOverlay
                    key={index}
                    tooltipText={'Income fixed'}
                    placement={'bottom'}>
                                <span>
                                    <FontAwesomeIcon className={colorPin}
                                                     icon={icon({name: 'thumbtack', style: 'solid'})}
                                                     onClick={(e: any) => {
                                                         changeFixedData(income, 'fixed', !income.fixed);
                                                     }}
                                    />
                                </span>
                </TooltipOverlay>
                {(income.fixed) && <span className={'d-sm-none ms-3 text-muted'}><small>{'this income is fixed'}</small></span>}
            </div>
        );
    }

    const buttonCreateNewIncome = () => {
        if (!isOwner) return null;
        return (
            <div>
                <div className="d-grid gap-2">
                    <button type={'button'} className={`btn btn-outline-primary ${themeContext.theme}-button-primary`}
                            onClick={() => createEmptyIncome()}>
                        <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})}/> Incluir nuevo ingreso
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`card ${themeContext.theme}-card`}>
            <div className="card-body">
                <div>
                    <div className={'mt-3'}>
                        {
                            showIncomes()
                        }
                    </div>
                </div>
                {buttonCreateNewIncome()}
                <IncomeModalComponent
                    showIncome={showIncomeModal}
                    setShowIncome={setShowIncomeModal}
                    income={income}
                    setIncome={setIncome}
                    callback={dispatchFunction}
                />
                <ConfirmModal
                    title={"Delete user"}
                    message={`Are you sure to delete ${income.name}?`}
                    callback={dispatchFunction}
                    show={deleteShowModal}
                    setShow={setDeleteShowModal}/>
            </div>
        </div>
    );
}

export default memo(IncomesGroupComponent);
