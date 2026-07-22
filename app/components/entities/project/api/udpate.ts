import type { updateData } from "../model/types";

export async function updateProject(projectId: number, params: updateData) {
    const {data, error} = await api.project[projectId].patch({
        ...params
    })

    if(error) {
        return false;
    }

    return data;
}