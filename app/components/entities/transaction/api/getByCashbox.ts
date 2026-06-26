export async function getByCashbox(
    cashboxId: number,
    projectId: number
) {
    const {data, error} = await api.project[projectId].cashbox[cashboxId].transaction.get();

    if(error) {
        return false;
    }

    return data;
}