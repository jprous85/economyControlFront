import {EconomyInterface} from "../interfaces/EconomyInterface";
import {AccountInterface} from "../../Account/interfaces/AccountInterface";
import React, {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import formatDate from "../../Shared/utils/formatDate";

interface props {
    account: AccountInterface;
    economy: EconomyInterface;
}

const InformationEconomyBox = ({account, economy}: props) => {

    const themeContext = useContext(ThemeContext);

    if (account.users === '') return null;

    const arrayUsers = JSON.parse(account.users) ?? [];
    const isShared = arrayUsers.length > 1;

    return (
        <div>
            <div className="d-flex align-items-center gap-2 mb-1">
                <h4 className={`${themeContext.theme}-text fw-bold mb-0`}>{account.name}</h4>
                {isShared && <span className="badge bg-warning text-dark">Compartida</span>}
            </div>
            {account.description && (
                <p className="text-muted mb-2" style={{fontSize: '0.875rem'}}>{account.description}</p>
            )}
            <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={icon({name: 'calendar', style: 'solid'})} className="text-secondary" style={{width: 12}}/>
                    <small className={`${themeContext.theme}-text`}>
                        <strong>{formatDate(economy.start_month)}</strong>
                        <span className="text-muted mx-1">→</span>
                        <strong>{formatDate(economy.end_month)}</strong>
                    </small>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <FontAwesomeIcon icon={icon({name: 'clock', style: 'solid'})} className="text-secondary" style={{width: 12}}/>
                    <small className="text-muted">{formatDate(account.created_at)}</small>
                </div>
            </div>
        </div>
    );
}

export default InformationEconomyBox;
