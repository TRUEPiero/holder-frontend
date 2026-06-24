<template>
    {{ projectData?.title }}
</template>

<script setup lang="ts">
    import { getById } from '~/components/entities/project/api/getById';
    import { useProjectStore } from '~/stores';

    import type { Project } from '~/components/entities/project/model/types';

    const projectStore = useProjectStore();
    const props = defineProps<{
        projectId: number
    }>()
    
    const projectId = props.projectId;

    const projectData: Ref<Project | null> = ref(null);
    const loading = ref(false);

    const getProject = async () => {
        loading.value = true

        const result = await getById(projectId);
        if(!result) return;

        projectData.value = result.data;
        projectStore.setProject(result.data);

        loading.value = false
    } 

    onMounted(async () => {
        await getProject();
    })
</script>