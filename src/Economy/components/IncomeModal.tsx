import SimpleModalDialog from "../../components/SimpleModalDialog";
import {Incomes} from "../interfaces/EconomyInterface";
import React, {ChangeEvent} from "react";
import Capitalize from "../../Shared/utils/Capitalize";

interface props {
    showIncome: boolean;
    setShowIncome: Function;
    income: Incomes;
    setIncome: Function;
    categories: Array<string>
    callback: Function;
}

const IncomeModalComponent = (
    {
        showIncome,
        setShowIncome,
        income,
        setIncome,
        categories,
        callback,
    }: props
) => {

    const changeIncomeData = (key: string, value: any) => {
        setIncome({...income, [key]: value});
    }

    return (
        <SimpleModalDialog
            title={"Incomes"}
            show={showIncome}
            setShow={setShowIncome}
            callback={callback}
            saveBtn={null}
            closeBtn={null}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="form">
                        <div className="col-md-12">
                            <label htmlFor="income-name" className={'form-label'}>{'Income name'}</label>
                            <input type="text" className="form-control" id={'income-name'} value={income.name}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeIncomeData('name', e.target.value)}/>
                        </div>
                        <div className="col-md-12 mt-3">
                            <label htmlFor="income-category" className={'form-label'}>{'Income Category'}</label>
                            <input className={'form-control'} list={"category-list-choice"} id={'category-list-input'} value={income.category ?? ''} name={'income-category'}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeIncomeData('category', Capitalize(e.target.value))}/>
                            <datalist id={'category-list-choice'}>
                                {categories.map((c: string) => <option value={Capitalize(c)} key={c}>
                                    {Capitalize(c)}</option>)}
                            </datalist>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <label htmlFor="income-amount" className={'form-label'}>{'amount'}</label>
                                <input type="number" className="form-control" id={'income-name'} value={income.amount}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeIncomeData('amount', e.target.value)}/>
                            </div>
                            <div className="col-md-6 mt-5 ps-4 pt-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input float-end success" type="checkbox" role="switch"
                                           id="account-active" checked={(income.active)}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               changeIncomeData('active', (e.target.checked) ? 1 : 0)
                                           }}/>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Active income
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SimpleModalDialog>
    );
}

export default IncomeModalComponent;
