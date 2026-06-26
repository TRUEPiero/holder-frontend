<template>
    <div 
        class="w-[50%]"
    >
        <Loader 
            v-if="loading"
            class="w-[250px]"
        />
        <p v-else>
            {{ projectData?.title }}
        </p>
    </div>
</template>

<script setup lang="ts">
import Loader from '~/components/shared/ui/loader/index.vue';
import { getById } from '~/components/entities/project/api/getById';
import { useProjectStore } from '~/stores';

import type { Project } from '~/components/entities/project/model/types';

const props = defineProps<{
    projectId: number
}>()

const projectStore = useProjectStore();

const projectData: Ref<Project | null> = ref(null);
const loading = ref(false);

const getProject = async () => {
    loading.value = true

    const result = await getById(props.projectId);
    if (!result) return;

    projectData.value = result.data;
    projectStore.setProject(result.data);

    loading.value = false
}

onMounted(async () => {
    await getProject();
})
</script>