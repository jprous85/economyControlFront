import {EconomyInterface} from "../interfaces/EconomyInterface";
interface props {
    economy: EconomyInterface
}

const ResultEconomyBox = ({economy}: props) => {

    const {totalIncomes, totalExpenses, totalPaid, pendingToPay, balance} = economy.economic_management.totals;
    const balanceColor = balance >= 0 ? '#198754' : '#dc3545';

    const pill = (label: string, value: number, valueColor: string) => (
        <div key={label} className="text-center px-3" style={{borderRight: '1px solid rgba(128,128,128,0.2)'}}>
            <div className="fw-bold" style={{color: valueColor, fontSize: '1rem'}}>{value.toFixed(2)} €</div>
            <div className="text-muted" style={{fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em'}}>{label}</div>
        </div>
    );

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-md-end gap-0">
            {pill('Ingresos', totalIncomes, '#198754')}
            {pill('Gastos', totalExpenses, '#dc3545')}
            {pill('Pagado', totalPaid, '#0d6efd')}
            {pill('Pendiente', pendingToPay, '#fd7e14')}
            <div className="text-center px-3">
                <div className="fw-bold" style={{color: balanceColor, fontSize: '1.15rem'}}>
                    {balance >= 0 ? '+' : ''}{balance.toFixed(2)} €
                </div>
                <div className="text-muted" style={{fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em'}}>Balance</div>
            </div>
        </div>
    );
}

export default ResultEconomyBox;
