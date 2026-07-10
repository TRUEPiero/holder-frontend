export async function sendVerify(email: string) {
    const {data, error} = await api.register.send.post({email});

    if(error) {
        return error;
    }

    return data;
}