type TransferType = 'income' | 'expense' 

type TransactionTag = Partial<{
    id: number,
    title: string
}>

type ExternalParams = {
    type: TransferType,
    amount: string,
    description?: string,
    tag?: TransactionTag
}

type InternalParams = {
    to: number,
    amount: string,
    description?: string,
    tag?: TransactionTag
}

export type {
    TransferType,
    ExternalParams,
    InternalParams
}