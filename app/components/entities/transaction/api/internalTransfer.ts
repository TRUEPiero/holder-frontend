import type { InternalParams } from "../model/types";

export async function internalTransfer(
    projectId: number,
    cashboxId: number,
    params: InternalParams
) {
    const {data, error} = await api.project[projectId].cashbox[cashboxId].transaction.transfer.post({
        ...params
    })

    if(error) {
        return false;
    }

    return data;
}