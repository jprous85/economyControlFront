import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";
import {Dropdown, DropdownButton} from "react-bootstrap";
import createIncome from "../hooks/createIncome";
import React, {ChangeEvent, memo, useRef, useState} from "react";
import IncomeModalComponent from "./IncomeModal";
import uuid from "react-uuid";
import deleteIncome from "../hooks/deleteIncome";
import ConfirmModal from "../../components/ConfirmModal";
import updateIncome from "../hooks/updateIncome";
import updateFixedStatus from "../hooks/updateFixedStatus";
import TooltipOverlay from "../../components/TooltipOverlay";

const INCOME = {
    "uuid": '',
    "name": '',
    "amount": 0,
    "fixed": false,
    "active": true
}

interface props {
    getEconomyFunction: Function;
    economy: EconomyInterface;
    setToast: Function;
    setToastMessage: Function;
    income: Incomes;
    setIncome: Function;
}

const IncomesGroupComponent = (
    {
        getEconomyFunction,
        economy,
        setToast,
        setToastMessage,
        income,
        setIncome,
    }: props) => {

    const itemEls = useRef<Array<HTMLElement>>([]);

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

                const colorPin = (income.fixed) ? 'black' : 'lightgray';

                return (
                    <div className={'row mb-2'} key={index}>
                        <div className="col-12 col-sm-1 text-md-center text-sm-start">
                            <TooltipOverlay
                                key={index}
                                tooltipText={'Income fixed'}
                                placement={'bottom'}>
                                <span>
                                    <FontAwesomeIcon style={{color: colorPin}}
                                                     icon={icon({name: 'thumbtack', style: 'solid'})}
                                                     onClick={(e: any) => {
                                                         changeFixedData(income, 'fixed', !income.fixed);
                                                     }}
                                    />
                                </span>
                            </TooltipOverlay>
                            {(income.fixed) && <span className={'d-sm-none ms-3 text-muted'}><small>{'this income is fixed'}</small></span>}
                        </div>
                        <div className="col-7"><strong>{income.name}</strong></div>
                        <div className="col-6 col-sm-2 text-end"><strong>{income.amount} €</strong></div>
                        <div className="col-md-2 col-sm-12">{menuActionOptions(income)}</div>
                        <hr className={'mt-3'}/>
                    </div>
                )
            })
        );
    }

    const menuActionOptions = (income: Incomes) => {
        return (
            <div className={'row'}>
                <div className="col-6 text-center">
                    <a href="#"
                       className="btn btn-warning text-end"
                       onClick={() => updateOldIncome(income)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                    </a>
                </div>
                <div className="col-6 text-center">
                    <a href="#"
                       className="btn btn-outline-danger text-end"
                       onClick={() => deleteSelectedIncome(income)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})}/>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="card border-primary">
            <div className="card-body">
                <div>
                    <div className={'mt-3'}>
                        {
                            showIncomes()
                        }
                    </div>
                </div>
                <div>
                    <div className="d-grid gap-2">
                        <a href="#" className={'btn btn-outline-primary'}
                           onClick={() => createEmptyIncome()}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})}/> Incluir nuevo ingreso</a>
                    </div>
                </div>
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
