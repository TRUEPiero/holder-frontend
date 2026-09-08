import type { Entities } from "../model/type";

export async function getByGroup(entity: Entities, entityId: number, groupId: number) {
    const {data, error} = await api[entity].settings[entityId].group[groupId].get();

    if(error) {
        return false;
    }

    return data;
}