export async function deleteCashbox(
    projectId: number,
    cashboxId: number
) {
    const {data, error} = await api.project[projectId].cashbox[cashboxId].delete()

    if(error) {
        return false;
    }

    return data;
}