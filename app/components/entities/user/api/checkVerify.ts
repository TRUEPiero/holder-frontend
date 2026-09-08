export async function checkVerify(email: string, verify_code: string) {
    const {data, error} = await api.register.check.post({
        email,
        verify_code
    });

    if(error) {
        return false;
    }

    return data;
}