export async function getByProject(
    projectId: number
) {
    const {data, error} = await api.project[projectId].cashbox.get();

    if(error) {
        return false;
    }

    return data;
}