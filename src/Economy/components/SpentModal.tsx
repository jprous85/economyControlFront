import SimpleModalDialog from "../../components/SimpleModalDialog";
import {Expenses, Incomes} from "../interfaces/EconomyInterface";
import React, {ChangeEvent, useContext} from "react";
import Capitalize from "../../Shared/utils/Capitalize";
import {ThemeContext} from "../../context/themeContext";

interface props {
    showSpent: boolean;
    setShowSpent: Function;
    spent: Expenses;
    setSpent: Function;
    categories: Array<string>
    callback: Function;
}

const SpentModalComponent = (
    {
        showSpent,
        setShowSpent,
        spent,
        setSpent,
        categories,
        callback,
    }: props
) => {

    const themeContext = useContext(ThemeContext);

    const changeSpentData = (key: string, value: any) => {
        setSpent({...spent, [key]: value});
    }

    return (
        <SimpleModalDialog
            title={"Incomes"}
            show={showSpent}
            setShow={setShowSpent}
            callback={callback}
            saveBtn={null}
            closeBtn={null}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="form">


                        <div className="row">
                            <div className="row justify-content-end">
                                <div className="col-8 col-md-4">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input float-end success" type="checkbox" role="switch"
                                               id="account-active" checked={(spent.active)}
                                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                   changeSpentData('active', (e.target.checked) ? 1 : 0)
                                               }}/>
                                        <label className={`form-check-label ${themeContext.theme}-text`} htmlFor="flexSwitchCheckChecked">
                                            Active spent
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-8 col-md-4">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input float-end success" type="checkbox" role="switch"
                                               id="account-paid" checked={(spent.paid)}
                                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                   changeSpentData('paid', (e.target.checked) ? 1 : 0)
                                               }}/>
                                        <label className={`form-check-label ${themeContext.theme}-text`} htmlFor="flexSwitchCheckChecked">
                                            Spent paid
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>





                        <div className="col-md-12">
                            <label htmlFor="income-name" className={`form-label ${themeContext.theme}-text`}>{'Income name'}</label>
                            <input type="text" className={`form-control ${themeContext.theme}-modal-input`} id={'income-name'} value={spent.name}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeSpentData('name', e.target.value)}/>
                        </div>
                        <div className="col-md-12 mt-3">
                            <label htmlFor="income-category" className={`form-label ${themeContext.theme}-text`}>{'Income Category'}</label>
                            <input className={`form-control ${themeContext.theme}-modal-input`} list={"category-list-choice"} id={'category-list-input'} value={spent.category ?? ''} name={'income-category'}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeSpentData('category', Capitalize(e.target.value))}/>
                            <datalist id={'category-list-choice'}>
                                {categories.map((c: string) => <option value={Capitalize(c)} key={c}>
                                    {Capitalize(c)}</option>)}
                            </datalist>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <label htmlFor="income-amount" className={`form-label ${themeContext.theme}-text`}>{'amount'}</label>
                                <input type="number" className={`form-control ${themeContext.theme}-modal-input`} id={'income-name'} value={spent.amount}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeSpentData('amount', e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SimpleModalDialog>
    );
}

export default SpentModalComponent;
