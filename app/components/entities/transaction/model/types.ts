type TransferType = 'income' | 'expense' 

type TransactionTag = Partial<{
    id: number,
    title: string
}>

type ExternalParams = {
    type: TransferType,
    amount: number,
    description?: string,
    tag?: TransactionTag
}

type InternalParams = {
    to: number,
    amount: number,
    description?: string,
    tag?: TransactionTag
}

export type {
    TransactionTag,
    TransferType,
    ExternalParams,
    InternalParams
}