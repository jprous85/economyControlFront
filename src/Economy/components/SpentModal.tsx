import SimpleModalDialog from "../../components/SimpleModalDialog";
import {Expenses, Incomes} from "../interfaces/EconomyInterface";
import React, {ChangeEvent} from "react";

interface props {
    showSpent: boolean;
    setShowSpent: Function;
    spent: Expenses;
    setSpent: Function;
    callback: Function;
}

const SpentModalComponent = (
    {
        showSpent,
        setShowSpent,
        spent,
        setSpent,
        callback,
    }: props
) => {

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
                        <div className="col-md-12">
                            <label htmlFor="income-name" className={'form-label'}>{'Income name'}</label>
                            <input type="text" className="form-control" id={'income-name'} value={spent.name}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeSpentData('name', e.target.value)}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mt-3">
                                <label htmlFor="income-amount" className={'form-label'}>{'amount'}</label>
                                <input type="number" className="form-control" id={'income-name'} value={spent.amount}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => changeSpentData('amount', e.target.value)}/>
                            </div>
                            <div className="col-md-6 mt-5 ps-4 pt-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input float-end success" type="checkbox" role="switch"
                                           id="account-active" checked={(spent.active)}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               changeSpentData('active', (e.target.checked) ? 1 : 0)
                                           }}/>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Active spent
                                    </label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input float-end success" type="checkbox" role="switch"
                                           id="account-paid" checked={(spent.paid)}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               changeSpentData('paid', (e.target.checked) ? 1 : 0)
                                           }}/>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Spent paid
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

export default SpentModalComponent;
