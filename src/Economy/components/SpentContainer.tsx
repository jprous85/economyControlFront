import React, {useContext} from "react";
import {Expenses} from "../interfaces/EconomyInterface";
import {ThemeContext} from "../../context/themeContext";

interface props {
    spent: Expenses;
    pinButtonChangeStatusOfFixed: Function;
    menuActionOptions: Function;
    switchChangePaidStatusOfSpend: Function;
    index: number;
}

const SpentContainer = ({spent, pinButtonChangeStatusOfFixed, menuActionOptions, switchChangePaidStatusOfSpend, index}: props) => {

    const themeContext = useContext(ThemeContext);

    const nameFormatted = spent.paid
        ? <del className="text-muted">{spent.name}</del>
        : <span><strong>{spent.name}</strong></span>;

    const amountClass = spent.paid ? 'text-muted' : 'text-danger';

    return (
        <div className="d-flex align-items-center gap-2 py-2"
             style={{borderBottom: '1px solid rgba(128,128,128,0.1)'}}>
            {pinButtonChangeStatusOfFixed(spent, index)}
            {switchChangePaidStatusOfSpend(spent)}
            <div className={`flex-grow-1 ${themeContext.theme}-text`}>{nameFormatted}</div>
            <div className={`fw-bold ${amountClass}`} style={{whiteSpace: 'nowrap', minWidth: 75, textAlign: 'right'}}>
                {Number(spent.amount).toFixed(2)} €
            </div>
            <div style={{flexShrink: 0}}>{menuActionOptions(spent)}</div>
        </div>
    );
}

export default SpentContainer;
