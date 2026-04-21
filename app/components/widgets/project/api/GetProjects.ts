export async function GetProjects() {
    const {data, error} = await api.project.get();

    if(error) console.log(error);

    return data;
}