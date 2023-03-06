export interface EconomyInterface {
    "id": number | null,
    "start_month": string,
    "end_month": string,
    "account_id": number,
    "economic_management": {
        "incomes": Incomes | object,
        "expenses": Expenses | object,
        "totals": Totals
    },
    "active": number,
    "created_at": string,
    "updated_at": string
}

export interface Incomes {
    "uuid": string | null,
    "name": string,
    "category": string,
    "amount": number,
    "fixed": boolean,
    "active": boolean
}

export interface Expenses {
    "uuid": string | null,
    "name": string,
    "category": string,
    "amount": number,
    "paid": boolean,
    "fixed": boolean,
    "active": boolean
}

export interface Totals {
    "totalIncomes": number,
    "totalPaid": number,
    "pendingToPay": number,
    "totalExpenses": number
}
