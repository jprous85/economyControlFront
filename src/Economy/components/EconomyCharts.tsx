import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";
import {EconomyInterface, Expenses, Incomes} from "../interfaces/EconomyInterface";

interface props {
    economy: EconomyInterface;
}

const EconomyCharts = ({economy}: props) => {

    const themeContext = useContext(ThemeContext);
    const isDark = themeContext.theme === 'dark';

    const {totalIncomes, totalExpenses, totalPaid, pendingToPay} = economy.economic_management.totals;

    // Donut: expenses by category
    const expenseEntries = Object.entries(economy.economic_management.expenses as { [key: string]: Expenses[] });
    const expenseLabels = expenseEntries.map((entry) => entry[0]);
    const expenseValues = expenseEntries.map((entry) =>
        entry[1].reduce((sum, item) => sum + Number(item.amount), 0)
    );

    // Donut: incomes by category
    const incomeEntries = Object.entries(economy.economic_management.incomes as { [key: string]: Incomes[] });
    const incomeLabels = incomeEntries.map((entry) => entry[0]);
    const incomeValues = incomeEntries.map((entry) =>
        entry[1].reduce((sum, item) => sum + Number(item.amount), 0)
    );

    const chartBg = 'transparent';
    const textColor = isDark ? '#adb5bd' : '#6c757d';
    const labelColor = isDark ? '#dee2e6' : '#343a40';

    const donutOptions = (labels: string[], colors: string[]): ApexOptions => ({
        chart: {background: chartBg, toolbar: {show: false}, sparkline: {enabled: false}},
        theme: {mode: isDark ? 'dark' : 'light'},
        labels,
        colors,
        dataLabels: {enabled: false},
        legend: {
            position: 'bottom',
            fontSize: '11px',
            labels: {colors: textColor},
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            color: labelColor,
                            fontSize: '13px',
                            formatter: (w) => {
                                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                                return `${total.toFixed(2)} €`;
                            }
                        },
                        value: {
                            color: labelColor,
                            fontSize: '14px',
                            formatter: (val) => `${Number(val).toFixed(2)} €`
                        }
                    }
                }
            }
        },
        tooltip: {y: {formatter: (val) => `${val.toFixed(2)} €`}},
        stroke: {width: 2, colors: [isDark ? '#1e2235' : '#ffffff']},
    });

    const barOptions: ApexOptions = {
        chart: {background: chartBg, toolbar: {show: false}, type: 'bar'},
        theme: {mode: isDark ? 'dark' : 'light'},
        colors: ['#198754', '#dc3545', '#0d6efd', '#fd7e14'],
        plotOptions: {bar: {borderRadius: 4, columnWidth: '55%', distributed: true}},
        dataLabels: {enabled: false},
        legend: {show: false},
        xaxis: {
            categories: ['Ingresos', 'Gastos', 'Pagado', 'Pendiente'],
            labels: {style: {colors: [textColor, textColor, textColor, textColor], fontSize: '11px'}},
            axisBorder: {show: false},
            axisTicks: {show: false},
        },
        yaxis: {
            labels: {
                style: {colors: [textColor] as any, fontSize: '10px'},
                formatter: (val) => `${val.toFixed(0)} €`
            }
        },
        grid: {borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'},
        tooltip: {y: {formatter: (val) => `${val.toFixed(2)} €`}},
    };

    const barSeries = [{
        name: 'Importe',
        data: [totalIncomes, totalExpenses, totalPaid, pendingToPay]
    }];

    const hasExpenses = expenseValues.length > 0;
    const hasIncomes = incomeValues.length > 0;

    if (!hasExpenses && !hasIncomes) return null;

    const CHART_HEIGHT = 240;
    const panelStyle = {borderRadius: 10, height: '100%', minHeight: 310};

    return (
        <div className="row g-3 mb-4 align-items-stretch">
            {/* Bar chart */}
            <div className="col-12 col-md-4 d-flex">
                <div className={`${themeContext.theme}-category-panel p-3 w-100`} style={panelStyle}>
                    <div className="mb-2" style={{fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: textColor}}>
                        Resumen
                    </div>
                    <ReactApexChart
                        type="bar"
                        options={barOptions}
                        series={barSeries}
                        height={CHART_HEIGHT}
                    />
                </div>
            </div>

            {/* Donut: incomes by category */}
            {hasIncomes && (
                <div className="col-12 col-md-4 d-flex">
                    <div className={`${themeContext.theme}-category-panel p-3 w-100`} style={panelStyle}>
                        <div className="mb-2" style={{fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: textColor}}>
                            Ingresos por categoría
                        </div>
                        <ReactApexChart
                            type="donut"
                            options={donutOptions(incomeLabels, ['#198754', '#06d6a0', '#4cc9f0', '#4361ee', '#7209b7', '#f72585'])}
                            series={incomeValues}
                            height={CHART_HEIGHT}
                        />
                    </div>
                </div>
            )}

            {/* Donut: expenses by category */}
            {hasExpenses && (
                <div className="col-12 col-md-4 d-flex">
                    <div className={`${themeContext.theme}-category-panel p-3 w-100`} style={panelStyle}>
                        <div className="mb-2" style={{fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: textColor}}>
                            Gastos por categoría
                        </div>
                        <ReactApexChart
                            type="donut"
                            options={donutOptions(expenseLabels, ['#dc3545', '#fd7e14', '#ffc107', '#e85d04', '#f48c06', '#ffb703'])}
                            series={expenseValues}
                            height={CHART_HEIGHT}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default EconomyCharts;
