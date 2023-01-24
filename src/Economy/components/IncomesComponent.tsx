import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";
import {Dropdown, DropdownButton} from "react-bootstrap";
import createIncome from "../hooks/createIncome";
import React, {ChangeEvent, useState} from "react";
import IncomeModalComponent from "./IncomeModal";
import uuid from "react-uuid";
import deleteIncome from "../hooks/deleteIncome";
import ConfirmModal from "../../components/ConfirmModal";
import updateIncome from "../hooks/updateIncome";
import updateFixedStatus from "../hooks/updateFixedStatus";

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
        if (incomes) {
            return (
                <table className="table table-responsive">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th className={'text-end'}>amount</th>
                        <th className={'text-end'}>fixed</th>
                        <th className={'text-end'}>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.from(incomes).map((income: any) => {
                            return (
                                (
                                    <tr key={income.uuid}>
                                        <td><strong>{income.name}</strong></td>
                                        <td className={'text-end'}>{income.amount} €</td>
                                        <td className={'text-end'}>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input float-end success" type="checkbox"
                                                       role="switch"
                                                       id="account-table-paid" checked={(income.fixed)}
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           changeFixedData(income, 'fixed', (e.target.checked) ? 1 : 0);
                                                       }}/>
                                            </div>
                                        </td>
                                        <td className={'text-end'}>{menuActionOptions(income)}</td>
                                    </tr>
                                )
                            );
                        })
                    }
                    </tbody>
                </table>
            )
        }
    }

    const menuActionOptions = (income: Incomes) => {
        return (
            <div className={'row justify-content-end'}>
                <div className="col-md-2">
                    <a href="#"
                       className="btn btn-warning text-end"
                       onClick={() => updateOldIncome(income)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                    </a>
                </div>
                <div className="col-md-3">
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

export default IncomesGroupComponent;
