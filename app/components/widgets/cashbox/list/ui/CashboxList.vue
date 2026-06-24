<template>
    <div>
        <div class="" v-for="cashbox in cashboxes">
            {{ cashbox.id }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { getByProject } from '~/components/entities/cashbox/api/getByProject';
import type { Cashbox } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
}>()

const projectId = props.projectId;

const cashboxes: Ref<Cashbox[]> = ref([]);
const loading = ref(false);

const getCashboxes = async () => {
    loading.value = true;
    const result = await getByProject(projectId);
    if (!result) return;

    cashboxes.value = result.data;

    loading.value = false;
}

onMounted(async () => {
    await getCashboxes();
})
</script>