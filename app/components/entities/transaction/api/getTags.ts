export async function getTags(
    projectId: number,
) {
    const {data, error} = await api.project[projectId].tags.get();

    if(error) {
        return false;
    }

    return data;
}