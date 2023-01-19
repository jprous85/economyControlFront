import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Incomes} from "../interfaces/EconomyInterface";
import {Dropdown, DropdownButton} from "react-bootstrap";
import createIncome from "../hooks/createIncome";
import React, {ChangeEvent, useState} from "react";
import IncomeModalComponent from "./IncomeModal";
import uuid from "react-uuid";
import deleteIncome from "../hooks/deleteIncome";
import ConfirmModal from "../../components/ConfirmModal";
import updateIncome from "../hooks/updateIncome";

const INCOME = {
    "uuid": uuid(),
    "name": '',
    "amount": 0,
    "active": 0
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


    const createEmptyIncome = () => {
        setIncome(INCOME);
        setShowIncomeModal(true);
        assignFunction(() => createNewIncome)
    }

    const updateOldIncome = (income: Incomes) => {
        setIncome(income);
        setShowIncomeModal(true);
        assignFunction(() => updateIncomeFunction);
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
                                        <th className={'text-end'}>{income.amount} €</th>
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
