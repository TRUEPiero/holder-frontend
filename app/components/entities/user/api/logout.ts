export async function logout() {
    const {data, error} = await api.auth.logout.post()

    if(error) {
        return false;
    }

    return data;
}