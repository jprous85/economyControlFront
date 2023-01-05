export interface EconomyInterface {
    "id": number | null,
    "start_month": string,
    "end_month": string,
    "account_id": number,
    "economic_management": {
        "incomes": object,
        "expenses": object,
        "totals": object
    },
    "active": number,
    "created_at": string,
    "updated_at": string
}

export interface Incomes {
    "uuid": string,
    "name": string,
    "amount": number,
    "active": number
}

export interface Expenses {
    "uuid": string,
    "name": string,
    "amount": number,
    "paid": boolean,
    "active": number
}

export interface Totals {
    "totalIncomes": number,
    "totalPaid": number,
    "pendingToPay": number
}
