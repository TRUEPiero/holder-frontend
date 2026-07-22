export async function deleteProjectById(projectId: number) {
    const {data, error} = await api.project[projectId].delete();

    if(error) {
        return false;
    }

    return data;
}