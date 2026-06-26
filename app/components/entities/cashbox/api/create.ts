import type { CreateData } from "../model/types";

export async function createCashbox(
    projectId: number,
    createData: CreateData
) {
    const {data, error} = await api.project[projectId].cashbox.post({
        ...createData
    })

    if(error) {
        return false;
    }

    return data;
}