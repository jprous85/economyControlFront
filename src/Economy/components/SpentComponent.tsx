import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Expenses} from "../interfaces/EconomyInterface";
import React, {ChangeEvent, memo, useContext, useState} from "react";
import uuid from "react-uuid";
import ConfirmModal from "../../components/ConfirmModal";
import createSpent from "../hooks/createSpent";
import updateSpent from "../hooks/updateSpent";
import deleteSpent from "../hooks/deleteSpent";
import SpentModalComponent from "./SpentModal";
import updatePaidStatusSpent from "../hooks/updatePaidStatusSpent";
import updateFixedStatus from "../hooks/updateFixedStatus";
import TooltipOverlay from "../../components/TooltipOverlay";
import {ThemeContext} from "../../context/themeContext";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import {getLocalStorageComplexData} from "../../Shared/Infrastructure/Persistence/localStorageComplexData";

const SPENT = {
    "uuid": uuid(),
    "name": '',
    "amount": 0,
    "paid": false,
    "fixed": false,
    "active": true
}

interface props {
    getEconomyFunction: Function;
    account: AccountInterface;
    economy: EconomyInterface;
    setToast: Function;
    setToastMessage: Function;
    spent: Expenses;
    setSpent: Function;
}

const SpentGroupComponent = (
    {
        getEconomyFunction,
        account,
        economy,
        setToast,
        setToastMessage,
        spent,
        setSpent,
    }: props) => {

    const themeContext = useContext(ThemeContext);
    const localStorage = getLocalStorageComplexData();

    const isOwner = account.ownersAccount.includes(localStorage.userId);

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

    const updateFixedStatusFunction = (economy: EconomyInterface, spent: Expenses, field: string) => {
        updateFixedStatus(economy, spent, field).then((updateResponse: any) => {
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

    const changeFixedData = (spent: Expenses, key: string, value: any) => {
        spent.fixed = value;
        updateFixedStatusCallback(spent);
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

    const updateFixedStatusCallback = (spent: Expenses) => {
        setSpent(spent);
        updateFixedStatusFunction(economy, spent, 'expenses');
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

        if (expenses.length === 0) return null;

        return (
            Array.from(expenses).map((internSpent: any, index: number) => {

                const nameFormatted = (internSpent.paid) ?
                    <del className={'text-muted'}>{internSpent.name}</del> :
                    <span><strong>{internSpent.name}</strong></span>;
;

                return (
                    <div className={'row mb-2'} key={index}>
                        {pinButtonChangeStatusOfFixed(internSpent, index)}
                        {switchChangePaidStatusOfSpend(internSpent)}
                        <div className={`col-6 col-sm-5 ${themeContext.theme}-text`}>{nameFormatted}</div>
                        <div className={`col-6 col-sm-2 text-end ${themeContext.theme}-text`}><strong>{internSpent.amount} €</strong></div>
                        <div className="col-12 col-sm-2">{menuActionOptions(internSpent)}</div>
                        <hr className={'mt-3'}/>
                    </div>
                )
            })
        );
    }

    const switchChangePaidStatusOfSpend = (internSpent: Expenses) => {
        if (!isOwner) return null;
        return (
            <div className="col-3 col-sm-1">
                <div className="form-check form-switch">
                    <input className="form-check-input float-end success" type="checkbox"
                           role="switch"
                           id="account-table-paid" checked={(internSpent.paid)}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               changeSpentData(internSpent, 'paid', (e.target.checked) ? 1 : 0);
                           }}/>
                </div>
            </div>
        );
    }

    const pinButtonChangeStatusOfFixed = (internSpent: Expenses, index: number) => {
        if (!isOwner) return null;
        const colorPin = (internSpent.fixed) ? themeContext.theme+'-pin-able' : themeContext.theme+'-pin-unable';

        return (
            <div className="col-9 col-sm-1 text-md-center text-sm-start">
                <TooltipOverlay
                    key={index}
                    tooltipText={'Spent fixed'}
                    placement={'bottom'}>
                                <span>
                                    <FontAwesomeIcon className={colorPin}
                                                     icon={icon({name: 'thumbtack', style: 'solid'})}
                                                     onClick={(e: any) => {
                                                         changeFixedData(internSpent, 'fixed', !internSpent.fixed);
                                                     }}
                                    />
                                </span>
                </TooltipOverlay>
                {(internSpent.fixed) && <span className={'d-sm-none ms-3 text-muted'}><small>{'this spent is fixed'}</small></span>}
            </div>
        );
    }

    const menuActionOptions = (internSpent: Expenses) => {
        if (!isOwner) return null;
        return (
            <div className={'row'}>
                <div className="col-6 text-center">
                    <a href="#"
                       className="btn btn-warning text-end"
                       onClick={() => updateOldSpent(internSpent)}
                    >
                        <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                    </a>
                </div>
                <div className="col-6 text-center">
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

    const buttonCreateNewSpent = () => {
        if (!isOwner) return null;
        return (
            <div>
                <div className="d-grid gap-2">
                    <button className={`btn btn-outline-primary ${themeContext.theme}-button-primary`}
                            onClick={() => createEmptySpent()}>
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
                            showExpenses()
                        }
                    </div>
                </div>
                {buttonCreateNewSpent()}
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

export default memo(SpentGroupComponent);
