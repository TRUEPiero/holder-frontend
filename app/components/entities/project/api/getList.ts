export async function getProjects(page?: number, limit?: number) {
    const {data, error} = await api.project.get({
        query: {page, limit}
    });

    if(error) {
        return false;
    }

    return data;
}