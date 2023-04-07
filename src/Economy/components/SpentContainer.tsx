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

const IncomeContainer = ({spent, pinButtonChangeStatusOfFixed, menuActionOptions, switchChangePaidStatusOfSpend, index}: props) => {

    const themeContext = useContext(ThemeContext);

    const nameFormatted = (spent.paid) ?
        <del className={'text-muted'}>{spent.name}</del> :
        <span><strong>{spent.name}</strong></span>;
    return (
        <div className={'row mb-2'} key={index}>
            {pinButtonChangeStatusOfFixed(spent, index)}
            {switchChangePaidStatusOfSpend(spent)}
            <div className={`col-6 col-sm-5 ${themeContext.theme}-text`}>{nameFormatted}</div>
            <div className={`col-6 col-sm-2 text-end ${themeContext.theme}-text`}><strong>{Number(spent.amount).toFixed(2)} €</strong></div>
            <div className="col-12 col-sm-2">{menuActionOptions(spent)}</div>
            <hr className={'mt-3'}/>
        </div>
    );
}

export default IncomeContainer;
