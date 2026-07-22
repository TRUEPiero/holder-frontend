type Cashbox = {
    id: number
    title: string
    description: string
    balance: string
}

type ExternalCashbox = {
    id: number
    title: string
}

type CashboxState = {
    active: Cashbox | null
    cashboxes: Cashbox[],
    needUpdate: number[],
    needReload: boolean
    // actived: Cashbox | null
}

type CreateData = {
    title: string,
    description?: string
}

type UpdateData = {
    title?: string,
    description?: string
}

export type {
    Cashbox,
    ExternalCashbox,
    CashboxState,
    CreateData,
    UpdateData
}