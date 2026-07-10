import type { RegisterData } from "../model/types";

export async function register(params: RegisterData) {
    const { data, error } = await api.register.post({
        ...params
    })

    if(error) {
        return false;
    }

    return data;
}