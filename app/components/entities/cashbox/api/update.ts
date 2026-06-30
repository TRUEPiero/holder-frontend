import type { UpdateData } from "../model/types";

export async function updateCashbox(
    projectId: number,
    cashboxId: number,
    updateData: UpdateData
) {
    const {data, error} = await api.project[projectId].cashbox[cashboxId].patch({
        ...updateData
    })

    if(error) {
        return false;
    }

    return data;
}