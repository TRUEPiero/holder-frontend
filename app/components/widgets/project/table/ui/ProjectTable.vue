<template>
    <UTable :data="data" :columns="columns"/>
</template>

<script setup lang="ts">
    import { getProjects } from '~/components/entities/project/api/getList';
    
    import type { TableColumn } from '@nuxt/ui';
    import type { Project } from '~/components/entities/project/model/types';

    const router = useRouter();

    const columns: TableColumn<Project>[] = [
        {
            accessorKey: 'id',
            header: '#',
        },
        {
            accessorKey: 'title',
            header: 'title',
            cell: ({ row }) => {
                const id: number = row.getValue('id');
                return h(
                    'button',
                    {
                        class: 'text-left underline font-bold cursor-pointer',
                        onClick: (e) => open(e, id)
                    },
                    row.getValue('title')
                )
            }
        },
        {
            accessorKey: 'balance',
            header: 'balance'
        }
    ];

    const data = ref<Project[]>([]);
    const loading = ref(false);

    const getTableData = async () => {
        loading.value = true;
        const result = await getProjects();
        if(!result) return;

        data.value = result.data;

        loading.value = false;
    }

    const open = (event: Event, id: number) => {
        event.preventDefault();
        
        router.push(`/project/${id}`)
    }

    onMounted(async () => {
        await getTableData();
    })
</script>