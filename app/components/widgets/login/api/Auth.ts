type AythFormData = {
    login: string,
    password: string,
    remember: boolean
}

export async function Auth(query: AythFormData) {
    const {data, error} = await api.auth.login.post({
       email: query.login,
       password: query.password,
       remember: query.remember
    })

    if(error) return null

    return data
}