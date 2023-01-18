import {EconomyInterface} from "../interfaces/EconomyInterface";

interface props {
    economy: EconomyInterface
}

const ResultEconomyBox = ({economy}: props) => {
    return (
        <div>
            <div className="card border-success mb-2">
                <div className="card-body">
                    <h4 className={'text-success'}>Totals</h4>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{'Total incomes'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{economy.economic_management.totals.totalIncomes} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{'Total expenses'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{economy.economic_management.totals.totalExpenses} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{'Total paid'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{economy.economic_management.totals.totalPaid} €</strong></span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{'Pending to pay'}:</strong>&nbsp;&nbsp;</span>
                        </div>
                        <div className="col-md-6">
                            <span className={'text-success'}><strong>{economy.economic_management.totals.pendingToPay} €</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultEconomyBox;
