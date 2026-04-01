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
import BlockSeparator from "./BlockSeparator";
import DataCategoriesComponent from "./DataCategoriesComponent";
import IsAdmin from "../../Shared/utils/isAdmin";

const SPENT = {
    "uuid": '',
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

const SpentGroupComponent = ({
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

    const admin = IsAdmin();
    const isOwner = account.ownersAccount.includes(localStorage.userId) || admin;

    const [showSpentModal, setShowSpentModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);
    const [customFunction, setCustomFunction] = useState<any>(() => {});

    const [expenses] = useState<any>(economy.economic_management.expenses);
    const categories = Object.keys(expenses);

    const {totalExpenses, totalPaid, pendingToPay} = economy.economic_management.totals;
    const paidPercent = totalExpenses > 0 ? Math.min(100, (totalPaid / totalExpenses) * 100) : 0;

    const createNewSpent = (economy: EconomyInterface, spent: Expenses) => {
        createSpent(economy, spent).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                if (expenses[spent.category]) {
                    expenses[spent.category].push(spent);
                } else {
                    expenses[spent.category] = [spent];
                }
                getEconomyFunction();
            }
        })
    }

    const updateSpentFunction = (economy: EconomyInterface, spent: Expenses) => {
        updateSpent(economy, spent).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                Object.keys(expenses).map((categories: string) => {
                    expenses[categories].map((spentCore: Expenses, index: number) => {
                        if (spentCore.uuid === spent.uuid) {
                            if (categories === spent.category) {
                                expenses[categories][index] = spent;
                            } else {
                                expenses[categories].splice(index, 1);
                                if (expenses[categories].length === 0) delete (expenses[categories]);
                                if (expenses[spent.category]) {
                                    expenses[spent.category].push(spent);
                                } else {
                                    expenses[spent.category] = [spent];
                                }
                            }
                            return;
                        }
                    });
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
                expenses[spent.category].map((spentCore: Expenses, index: number) => {
                    if (spentCore.uuid === spent.uuid) {
                        expenses[spent.category][index] = spent;
                        return;
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
                expenses[spent.category].map((spentCore: Expenses, index: number) => {
                    if (spentCore.uuid === spent.uuid) {
                        expenses[spent.category][index] = spent;
                        return;
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
                const index = expenses[spent.category].indexOf(spent);
                if (index > -1) expenses[spent.category].splice(index, 1);
                if (expenses[spent.category].length === 0) delete (expenses[spent.category]);
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
        SPENT.uuid = uuid();
        setSpent(SPENT);
        setShowSpentModal(true);
        assignFunction(() => createNewSpent);
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

    const dispatchFunction = () => customFunction(economy, spent);
    const assignFunction = (callback: Function) => setCustomFunction(callback);

    const switchChangePaidStatusOfSpend = (internSpent: Expenses) => {
        if (!isOwner) return null;
        return (
            <div style={{flexShrink: 0}}>
                <div className="form-check form-switch mb-0">
                    <input className="form-check-input"
                           type="checkbox"
                           role="switch"
                           checked={Boolean(internSpent.paid)}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               changeSpentData(internSpent, 'paid', e.target.checked ? 1 : 0);
                           }}/>
                </div>
            </div>
        );
    }

    const pinButtonChangeStatusOfFixed = (internSpent: Expenses, index: number) => {
        if (!isOwner) return null;
        const colorPin = internSpent.fixed ? themeContext.theme + '-pin-able' : themeContext.theme + '-pin-unable';
        return (
            <div key={index} style={{flexShrink: 0, width: 18}}>
                <TooltipOverlay tooltipText={'Gasto fijo'} placement={'bottom'}>
                    <span>
                        <FontAwesomeIcon className={colorPin}
                                         icon={icon({name: 'thumbtack', style: 'solid'})}
                                         onClick={() => changeFixedData(internSpent, 'fixed', !internSpent.fixed)}
                                         style={{cursor: 'pointer'}}
                        />
                    </span>
                </TooltipOverlay>
            </div>
        );
    }

    const menuActionOptions = (internSpent: Expenses) => {
        if (!isOwner) return null;
        return (
            <div className="d-flex gap-1">
                <a href="#" className="btn btn-sm btn-warning" onClick={() => updateOldSpent(internSpent)}>
                    <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                </a>
                <a href="#" className="btn btn-sm btn-outline-danger" onClick={() => deleteSelectedSpent(internSpent)}>
                    <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})}/>
                </a>
            </div>
        );
    }

    const showExpenses = () => {
        if (categories.length === 0) return (
            <p className="text-muted" style={{fontSize: '0.875rem'}}>Sin gastos aún.</p>
        );
        return categories.map((key: any) => {
            const subtotal = expenses[key].reduce((sum: number, item: Expenses) => sum + Number(item.amount), 0);
            return (
                <div className={`${themeContext.theme}-category-panel mb-3 p-3`} key={key}>
                    <BlockSeparator title={key} subtotal={subtotal}/>
                    <DataCategoriesComponent
                        items={expenses[key]}
                        type={'spent'}
                        pinButtonChangeStatusOfFixed={pinButtonChangeStatusOfFixed}
                        menuActionOptions={menuActionOptions}
                        switchChangePaidStatusOfSpend={switchChangePaidStatusOfSpend}
                    />
                </div>
            );
        });
    }

    return (
        <div>
            {/* Section header */}
            <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-3">
                        <span className={`${themeContext.theme}-text`}
                              style={{fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                            Gastos
                        </span>
                        <span className="text-danger fw-bold">{totalExpenses.toFixed(2)} €</span>
                    </div>
                    {isOwner && (
                        <button type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={createEmptySpent}>
                            <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} className="me-1"/>
                            Añadir
                        </button>
                    )}
                </div>
                {totalExpenses > 0 && (
                    <div>
                        <div className="progress" style={{height: 4, borderRadius: 2}}>
                            <div className="progress-bar bg-success"
                                 role="progressbar"
                                 style={{width: `${paidPercent}%`}}/>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <small className="text-muted" style={{fontSize: '0.7rem'}}>
                                Pagado: <span className="text-success fw-semibold">{totalPaid.toFixed(2)} €</span>
                            </small>
                            <small className="text-muted" style={{fontSize: '0.7rem'}}>
                                Pendiente: <span className="text-warning fw-semibold">{pendingToPay.toFixed(2)} €</span>
                            </small>
                        </div>
                    </div>
                )}
            </div>

            {showExpenses()}

            <SpentModalComponent
                showSpent={showSpentModal}
                setShowSpent={setShowSpentModal}
                spent={spent}
                setSpent={setSpent}
                categories={categories}
                callback={dispatchFunction}
            />
            <ConfirmModal
                title={"Eliminar gasto"}
                message={`¿Seguro que quieres eliminar "${spent.name}"?`}
                callback={dispatchFunction}
                show={deleteShowModal}
                setShow={setDeleteShowModal}
                saveBtn={null}
                closeBtn={null}
            />
        </div>
    );
}

export default memo(SpentGroupComponent);
