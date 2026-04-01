import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EconomyInterface, Incomes} from "../interfaces/EconomyInterface";
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
import BlockSeparator from "./BlockSeparator";
import DataCategoriesComponent from "./DataCategoriesComponent";

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

const IncomesGroupComponent = ({
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
    const isOwner = account.ownersAccount.includes(localStorage.userId) || admin;

    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);
    const [customFunction, setCustomFunction] = useState<any>(() => {});

    const [incomes] = useState<any>(economy.economic_management.incomes);
    const categories = Object.keys(incomes);

    const createNewIncome = (economy: EconomyInterface, income: Incomes) => {
        createIncome(economy, income).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                if (incomes[income.category]) {
                    incomes[income.category].push(income);
                } else {
                    incomes[income.category] = [income];
                }
                getEconomyFunction();
            }
        })
    }

    const updateIncomeFunction = (economy: EconomyInterface, income: Incomes) => {
        updateIncome(economy, income).then((createResponse: any) => {
            if (createResponse) {
                setToast(true);
                setToastMessage(createResponse.data);
                Object.keys(incomes).map((categories: string) => {
                    incomes[categories].map((incomeCore: Incomes, index: number) => {
                        if (incomeCore.uuid === income.uuid) {
                            if (categories === income.category) {
                                incomes[categories][index] = income;
                            } else {
                                incomes[categories].splice(index, 1);
                                if (incomes[categories].length === 0) delete (incomes[categories]);
                                if (incomes[income.category]) {
                                    incomes[income.category].push(income);
                                } else {
                                    incomes[income.category] = [income];
                                }
                            }
                        }
                    });
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
                incomes[income.category].map((incomeCore: Incomes, index: number) => {
                    if (incomeCore.uuid === income.uuid) incomes[income.category][index] = income;
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
                const index = incomes[income.category].indexOf(income);
                if (index > -1) incomes[income.category].splice(index, 1);
                if (incomes[income.category].length === 0) delete (incomes[income.category]);
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
        assignFunction(() => createNewIncome);
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

    const dispatchFunction = () => customFunction(economy, income);
    const assignFunction = (callback: Function) => setCustomFunction(callback);

    const pinButtonChangeStatusOfFixed = (income: Incomes, index: number) => {
        if (!isOwner) return null;
        const colorPin = income.fixed ? themeContext.theme + '-pin-able' : themeContext.theme + '-pin-unable';
        return (
            <div key={index} style={{flexShrink: 0, width: 18}}>
                <TooltipOverlay tooltipText={'Ingreso fijo'} placement={'bottom'}>
                    <span>
                        <FontAwesomeIcon className={colorPin}
                                         icon={icon({name: 'thumbtack', style: 'solid'})}
                                         onClick={() => changeFixedData(income, 'fixed', !income.fixed)}
                                         style={{cursor: 'pointer'}}
                        />
                    </span>
                </TooltipOverlay>
            </div>
        );
    }

    const menuActionOptions = (income: Incomes) => {
        if (!isOwner) return null;
        return (
            <div className="d-flex gap-1">
                <a href="#" className="btn btn-sm btn-warning" onClick={() => updateOldIncome(income)}>
                    <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                </a>
                <a href="#" className="btn btn-sm btn-outline-danger" onClick={() => deleteSelectedIncome(income)}>
                    <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})}/>
                </a>
            </div>
        );
    }

    const showIncomes = () => {
        if (categories.length === 0) return (
            <p className="text-muted" style={{fontSize: '0.875rem'}}>Sin ingresos aún.</p>
        );
        return categories.map((key: any) => {
            const subtotal = incomes[key].reduce((sum: number, item: Incomes) => sum + Number(item.amount), 0);
            return (
                <div className={`${themeContext.theme}-category-panel mb-3 p-3`} key={key}>
                    <BlockSeparator title={key} subtotal={subtotal}/>
                    <DataCategoriesComponent
                        items={incomes[key]}
                        type={'income'}
                        pinButtonChangeStatusOfFixed={pinButtonChangeStatusOfFixed}
                        menuActionOptions={menuActionOptions}
                        switchChangePaidStatusOfSpend={null}
                    />
                </div>
            );
        });
    }

    return (
        <div>
            {/* Section header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-3">
                    <span className={`${themeContext.theme}-text`}
                          style={{fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                        Ingresos
                    </span>
                    <span className="text-success fw-bold">
                        {economy.economic_management.totals.totalIncomes.toFixed(2)} €
                    </span>
                </div>
                {isOwner && (
                    <button type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={createEmptyIncome}>
                        <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} className="me-1"/>
                        Añadir
                    </button>
                )}
            </div>

            {showIncomes()}

            <IncomeModalComponent
                showIncome={showIncomeModal}
                setShowIncome={setShowIncomeModal}
                income={income}
                setIncome={setIncome}
                categories={categories}
                callback={dispatchFunction}
            />
            <ConfirmModal
                title={"Eliminar ingreso"}
                message={`¿Seguro que quieres eliminar "${income.name}"?`}
                callback={dispatchFunction}
                show={deleteShowModal}
                setShow={setDeleteShowModal}
                saveBtn={null}
                closeBtn={null}
            />
        </div>
    );
}

export default memo(IncomesGroupComponent);
