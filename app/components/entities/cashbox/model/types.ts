type Cashbox = {
    id: number
    title: string
    description: string
    balance: string
}

type CashboxState = {
    cashboxes: Cashbox[],
    actived: Cashbox | null
}

type CreateData = {
    title: string,
    description?: string
}

export type {
    Cashbox,
    CashboxState,
    CreateData
}