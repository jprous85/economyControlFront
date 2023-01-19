import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Expenses} from "../interfaces/EconomyInterface";
import React, {ChangeEvent, useState} from "react";
import uuid from "react-uuid";
import ConfirmModal from "../../components/ConfirmModal";
import createSpent from "../hooks/createSpent";
import updateSpent from "../hooks/updateSpent";
import deleteSpent from "../hooks/deleteSpent";
import SpentModalComponent from "./SpentModal";
import updatePaidStatusSpent from "../hooks/updatePaidStatusSpent";

const SPENT = {
    "uuid": uuid(),
    "name": '',
    "amount": 0,
    "paid": false,
    "active": false
}

interface props {
    getEconomyFunction: Function;
    economy: EconomyInterface;
    setToast: Function;
    setToastMessage: Function;
    spent: Expenses;
    setSpent: Function;
}

const SpentGroupComponent = (
    {
        getEconomyFunction,
        economy,
        setToast,
        setToastMessage,
        spent,
        setSpent,
    }: props) => {

    const [showSpentModal, setShowSpentModal] = useState(false);

    const [deleteShowModal, setDeleteShowModal] = useState(false);

    const [customFunction, setCustomFunction] = useState<any>(() => {
    });

    const [expenses] = useState<any>(economy.economic_management.expenses);

    const createNewSpent = (economy: EconomyInterface, spent: Expenses) => {
        createSpent(economy, spent).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                expenses.push(spent);
                getEconomyFunction();
            }
        })
    }

    const updateSpentFunction = (economy: EconomyInterface, spent: Expenses) => {
        updateSpent(economy, spent).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);

                expenses.map((spentCore: Expenses, index: number) => {
                    if (spentCore.uuid === spent.uuid) {
                        expenses[index] = spent;
                    }
                });
                getEconomyFunction();
            }
        })
    }

    const updatePaidStatusSpentFunction = (economy: EconomyInterface, spent: Expenses) => {
        updatePaidStatusSpent(economy, spent).then((updateResponse: any) => {
            if (updateResponse) {
                setToast(true);
                setToastMessage(updateResponse.data);

                expenses.map((spentCore: Expenses, index: number) => {
                    if (spentCore.uuid === spent.uuid) {
                        expenses[index] = spent;
                    }
                });
                getEconomyFunction();
            }
        })
    }


    const deleteSpentFunction = (economy: EconomyInterface, spent: Expenses) => {
        deleteSpent(economy, spent).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                const index = expenses.indexOf(spent);
                if (index > -1) { // only splice array when item is found
                    expenses.splice(index, 1); // 2nd parameter means remove one item only
                }
                getEconomyFunction();
            }
        })
    }

    const changeSpentData = (spent: Expenses, key: string, value: any) => {
        spent.paid = value;
        updatePaidStatusSpentCallback(spent);
    }

    const createEmptySpent = () => {
        setSpent(SPENT);
        setShowSpentModal(true);
        assignFunction(() => createNewSpent)
    }

    const updateOldSpent = (spent: Expenses) => {
        setSpent(spent);
        setShowSpentModal(true);
        assignFunction(() => updateSpentFunction);
    }

    const updatePaidStatusSpentCallback = (spent: Expenses) => {
        setSpent(spent);
        updatePaidStatusSpentFunction(economy, spent);
    }

    const deleteSelectedSpent = (spent: Expenses) => {
        setSpent(spent);
        setDeleteShowModal(true);
        assignFunction(() => deleteSpentFunction);
    }


    const dispatchFunction = () => {
        customFunction(economy, spent);
    }

    const assignFunction = (callback: Function) => {
        setCustomFunction(callback);
    }

    const showExpenses = () => {
        if (expenses) {
            return (
                <table className="table table-responsive">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th className={'text-end'}>amount</th>
                        <th className={'text-end'}>paid</th>
                        <th className={'text-end'}>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.from(expenses).map((internSpent: any) => {

                            const nameFormatted = (internSpent.paid) ?
                                <del className={'text-muted'}>{internSpent.name}</del> :
                                <span><strong>{internSpent.name}</strong></span>;

                            return (
                                (
                                    <tr key={internSpent.uuid}>
                                        <td>{nameFormatted}</td>
                                        <th className={'text-end'}>{internSpent.amount} €</th>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input float-end success" type="checkbox"
                                                       role="switch"
                                                       id="account-table-paid" checked={(internSpent.paid)}
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           changeSpentData(internSpent, 'paid', (e.target.checked) ? 1 : 0);
                                                       }}/>
                                            </div>
                                        </td>
                                        <td className={'text-end'}>{menuActionOptions(internSpent)}</td>
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

    const menuActionOptions = (internSpent: Expenses) => {
        return (
            <div className={'row justify-content-end'}>
                <div className="col-md-3">
                    <a href="#"
                       className="btn btn-warning text-end"
                       onClick={() => updateOldSpent(internSpent)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                    </a>
                </div>
                <div className="col-md-3">
                    <a href="#"
                       className="btn btn-outline-danger text-end"
                       onClick={() => deleteSelectedSpent(internSpent)}
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
                            showExpenses()
                        }
                    </div>
                </div>
                <div>
                    <div className="d-grid gap-2">
                        <a href="#" className={'btn btn-outline-primary'}
                           onClick={() => createEmptySpent()}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})}/> Incluir nuevo ingreso</a>
                    </div>
                </div>
                <SpentModalComponent
                    showSpent={showSpentModal}
                    setShowSpent={setShowSpentModal}
                    spent={spent}
                    setSpent={setSpent}
                    callback={dispatchFunction}
                />
                <ConfirmModal
                    title={"Delete user"}
                    message={`Are you sure to delete ${spent.name}?`}
                    callback={dispatchFunction}
                    show={deleteShowModal}
                    setShow={setDeleteShowModal}/>
            </div>
        </div>
    );
}

export default SpentGroupComponent;
