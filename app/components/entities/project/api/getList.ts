export async function getProjects() {
    const {data, error} = await api.project.get();

    if(error) {
        return false;
    }

    return data;
}