import {EconomyInterface} from "../interfaces/EconomyInterface";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import React, {ChangeEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";

interface props {
    account: AccountInterface;
    economy: EconomyInterface;
}

const InformationEconomyBox = ({account, economy}: props) => {


    if (account.users !== '') {
        const arrayUsers = JSON.parse(account.users) ?? [];

        return (
            <div>
                <div className="card mb-2 border-secondary">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-11">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h4 className={'text-muted'}>{account.name}</h4>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        {arrayUsers.length > 1 && <span className={'text-warning'}><small><strong>Cuenta compartida</strong></small></span>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                                <div className="form-check form-switch justify-content-end text-end">
                                    <input className="form-check-input" type="checkbox"
                                           role="switch"
                                           id="account-active" checked={(account.active) === 1}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                               //changeIncomeData('active', (e.target.checked) ? 1 : 0)
                                           }}/>
                                    <a href="#"
                                       className="btn btn-warning text-end"
                                        //onClick={() => updateOldIncome(income)}
                                    >
                                        <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-4">
                                <div className="col-md-12">
                                    <span>{'identifier'}: </span><span><small>{account.uuid}</small></span>
                                </div>
                                <div className="col-md-12 mt-2">
                                    <span>{'From'}: </span><span><strong>{economy.start_month}</strong></span></div>
                                <div className="col-md-12 mt-2">
                                    <span>{'To'}: </span><span><strong>{economy.end_month}</strong></span></div>
                                <div className="col-md-12 mt-2">
                                    <span>{'Account created at'}: </span><span>{account.created_at}</span></div>
                            </div>
                            <div className="col-md-8">
                                <div>
                                    {account.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default InformationEconomyBox;
