import { externalTransfer } from "~/components/entities/transaction/api/externalTransfer";
import { internalTransfer } from "~/components/entities/transaction/api/internalTransfer";
import type { TransferType } from "~/components/entities/transaction/model/types";

type State = {
    amount: string,
    description: string
}

export function useTransfer() {
    const transfer = async (
        projectId: number,
        fromId: Ref<number>,
        toId: Ref<number>,
        state: State,
        tag: Ref<any>
    ) => {
        let res = null;

        if (!fromId.value || !toId.value) {
            const cashboxId = fromId.value || toId.value;

            const params = {
                type: fromId.value ? 'expense' : 'income' as TransferType,
                amount: Number(state.amount),
                description: state.description,
                tag: tag.value?.length ? {
                    title: tag.value[0]
                } : undefined
            };

            res = await externalTransfer(projectId, cashboxId, params)
        } else {
            const params = {
                to: toId.value,
                amount: Number(state.amount),
                description: state.description,
                tag: tag.value?.length ? {
                    title: tag.value[0]
                } : undefined
            };

            res = await internalTransfer(projectId, fromId.value, params)
        }

        return res
    }

    return {
        transfer
    }
}