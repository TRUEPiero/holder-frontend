import type { ExternalParams } from "../model/types";

export async function externalTransfer(
    projectId: number,
    cashboxId: number,
    params: ExternalParams
) {
    const {data, error} = await api.project[projectId].cashbox[cashboxId].transaction.external.post({
        ...params
    })

    if(error) {
        return false;
    }

    return data;
}