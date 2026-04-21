<template>
    <UTable
        :columns="columns" 
        :data="data"
    />
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { GetProjects } from '../api/GetProjects';

    type Setting = {
        code: string,
        value: string
    }

    type Project = {
        id: number, 
        title: string,
        ownerId: number,
        owner: any,
        settings: Setting[],
        cashboxes: any[],
        members: any[],
    } 

    const columns: TableColumn<Project>[] = [
        {
            accessorKey: 'id',
        },
        {
            accessorKey: 'title',
        },
    ]

    const projects = ref<Project[]>([]); 

    const data = computed(() => projects)

    async function getProjectList() {
        const res = await GetProjects();
        return res;
    }

    onMounted(async () => {
        projects.value = await getProjectList();
    })
</script>