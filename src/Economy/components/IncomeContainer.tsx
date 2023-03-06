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
        <div className={'row mb-2'} key={index}>
            {pinButtonChangeStatusOfFixed(income, index)}
            <div className={`col-7 ${themeContext.theme}-text`}><strong>{income.name}</strong></div>
            <div className={`col-6 col-sm-2 text-end ${themeContext.theme}-text`}>
                <strong>{income.amount} €</strong></div>
            <div className="col-md-2 col-sm-12">{menuActionOptions(income)}</div>
            <hr className={'mt-3'}/>
        </div>
    );
}

export default IncomeContainer;
