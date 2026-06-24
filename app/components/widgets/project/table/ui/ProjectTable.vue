<template>
    <UTable :data="data" :columns="columns"/>
</template>

<script setup lang="ts">
    import { getProjects } from '~/components/entities/project/api/getList';
    
    import type { TableColumn } from '@nuxt/ui';
    import type { Project } from '~/components/entities/project/model/types';

    const columns: TableColumn<Project>[] = [
        {
            accessorKey: 'id',
            header: '#',
        },
        {
            accessorKey: 'title',
            header: 'title'
        }
    ];

    const data: Ref<Project[]> = ref([]);
    const loading = ref(false);

    const getTableData = async () => {
        loading.value = true;
        const result = await getProjects();
        if(!result) return;

        data.value = result.data;

        loading.value = false;
    }

    onMounted(async () => {
        await getTableData();
    })
</script>