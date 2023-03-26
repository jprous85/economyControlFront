import {EconomyInterface} from "../interfaces/EconomyInterface";
import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";

interface props {
    economy: EconomyInterface
}

const ResultEconomyBox = ({economy}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <div>
            <div className={`card border-success mb-2 ${themeContext.theme}-card`}>
                <div className="card-body">
                    <h6 className={'text-success'}>Totals</h6>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{'Total incomes'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{economy.economic_management.totals.totalIncomes} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{'Total expenses'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{economy.economic_management.totals.totalExpenses} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{'Total paid'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{economy.economic_management.totals.totalPaid} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{'Pending to pay'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{economy.economic_management.totals.pendingToPay} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{'Pending to pay'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={`${themeContext.theme}-green-text`}><strong>{economy.economic_management.totals.pendingToPay} €</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultEconomyBox;
