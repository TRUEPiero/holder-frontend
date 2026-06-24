export async function getById(id: number) {
    const {data, error} = await api.project[id].get();

    if(error) {
        return false;
    }

    return data;
}