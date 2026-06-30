import { getTags } from '~/components/entities/transaction/api/getTags';

import type { TransactionTag } from "~/components/entities/transaction/model/types"

export function useTags(
    projectId: number,
) {

    const tags = ref<string[]>([])
    const tag = ref()

    const createTag = (item: string) => {
        tags.value.push(item)
        tag.value = [item]
    }

    const fetchTags = async () => {
        const res = await getTags(projectId);
        if (!res) return;

        tags.value = res.data.map((i: TransactionTag) => i.title)
    }

    return {
        tags,
        tag,
        createTag,
        fetchTags
    }
}