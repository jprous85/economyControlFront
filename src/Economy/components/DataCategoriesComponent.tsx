import {Expenses, Incomes} from "../interfaces/EconomyInterface";
import IncomeContainer from "./IncomeContainer";
import SpentContainer from "./SpentContainer";

interface props {
    items: [];
    type: string;
    pinButtonChangeStatusOfFixed: Function;
    menuActionOptions: Function;
    switchChangePaidStatusOfSpend: any;
}

const DataCategoriesComponent = (
    {
        items,
        type,
        pinButtonChangeStatusOfFixed,
        menuActionOptions,
        switchChangePaidStatusOfSpend
    }: props) => {


    if (!items) return <></>;

    const dataContainer = items.map((item: any, index: number) => {
        if (type === 'income') {
            return (
                <IncomeContainer
                    key={index}
                    income={item}
                    pinButtonChangeStatusOfFixed={pinButtonChangeStatusOfFixed}
                    menuActionOptions={menuActionOptions}
                    index={index}
                />
            );
        }
        if (type === 'spent') {
            return (
                <SpentContainer
                    key={index}
                    spent={item}
                    pinButtonChangeStatusOfFixed={pinButtonChangeStatusOfFixed}
                    menuActionOptions={menuActionOptions}
                    switchChangePaidStatusOfSpend={switchChangePaidStatusOfSpend}
                    index={index}
                />
            );
        }

    });

    return (
        <div>
            {dataContainer}
        </div>
    );

}

export default DataCategoriesComponent;
