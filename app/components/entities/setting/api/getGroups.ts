import type { Entities } from "../model/type";

export async function getGroups(entity: Entities, entityId: number) {
    const {data, error} = await api[entity].settings[entityId].groups.get();

    if(error) {
        return false;
    }

    return data;
}