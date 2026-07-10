import type { createData } from "../model/types";

export async function createProject(params: createData) {
    const { data, error } = await api.project.post({
        ...params
    })

    if(error) {
        return false;
    }

    return data;
} 