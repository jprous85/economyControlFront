import {EconomyInterface} from "../interfaces/EconomyInterface";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import React, {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";

interface props {
    account: AccountInterface;
    economy: EconomyInterface;
}

const InformationEconomyBox = ({account, economy}: props) => {

    const themeContext = useContext(ThemeContext);

    if (account.users !== '') {
        const arrayUsers = JSON.parse(account.users) ?? [];

        return (
            <div>
                <div className={`card ${themeContext.theme}-card`}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h4 className={`${themeContext.theme}-text`}>{account.name}</h4>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        {arrayUsers.length > 1 && <span className={'text-warning'}><small><strong>Cuenta compartida</strong></small></span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-4">
                                <div className={`col-md-12 ${themeContext.theme}-text`}>
                                    <span>{'identifier'}: </span><span><small>{account.uuid}</small></span>
                                </div>
                                <div className={`col-md-12col-md-12 mt-2 ${themeContext.theme}-text`}>
                                    <span>{'From'}: </span><span><strong>{economy.start_month}</strong></span></div>
                                <div className={`col-md-12 mt-2 ${themeContext.theme}-text`}>
                                    <span>{'To'}: </span><span><strong>{economy.end_month}</strong></span></div>
                                <div className={`col-md-12 mt-2 ${themeContext.theme}-text`}>
                                    <span>{'Account created at'}: </span><span>{account.created_at}</span></div>
                            </div>
                            <div className="col-md-8">
                                <div className={`${themeContext.theme}-text`}>
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
