export async function getById(
    projectId: number,
    cashboxId: number
) {
    const {data, error} = await api.project[projectId].cashbox[cashboxId].get();

    if(error) {
        return false;
    }

    return data;
}