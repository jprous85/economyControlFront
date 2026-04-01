import React, {useContext} from "react";
import {Incomes} from "../interfaces/EconomyInterface";
import {ThemeContext} from "../../context/themeContext";

interface props {
    income: Incomes;
    pinButtonChangeStatusOfFixed: Function;
    menuActionOptions: Function;
    index: number;
}

const IncomeContainer = ({income, pinButtonChangeStatusOfFixed, menuActionOptions, index}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <div className="d-flex align-items-center gap-2 py-2"
             style={{borderBottom: '1px solid rgba(128,128,128,0.1)'}}>
            {pinButtonChangeStatusOfFixed(income, index)}
            <div className={`flex-grow-1 ${themeContext.theme}-text`}><strong>{income.name}</strong></div>
            <div className="text-success fw-bold" style={{whiteSpace: 'nowrap', minWidth: 75, textAlign: 'right'}}>
                {Number(income.amount).toFixed(2)} €
            </div>
            <div style={{flexShrink: 0}}>{menuActionOptions(income)}</div>
        </div>
    );
}

export default IncomeContainer;
