export async function cashboxList(query: any) {
    const {data, error} = await api.auth.login.post({
       email: query.login,
       password: query.password,
       remember: query.remember
    })

    if(error) return null

    return data
}