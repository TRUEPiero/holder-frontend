export async function AuthByEmail(
    email: string,
    password: string,
) {
    const {data, error} = await api.auth.login.post({
        email,
        password,

    })

    if(error) {
        return false;
    }

    return data;
}