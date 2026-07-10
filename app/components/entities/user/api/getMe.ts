export async function getMe() {
    const {data, error} = await api.user.me.get();

    if(error) {
        return false;
    }

    return data;
}