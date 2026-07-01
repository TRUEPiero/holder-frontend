<template>
    <UTable class="ProjectTable" :data="data" :columns="columns" :empty="t('project.table.empty')"
        :ui="{base: 'ProjectTable__base rounded-xl ring ring-default'}"
    />
</template>

<script setup lang="ts">
    import { getProjects } from '~/components/entities/project/api/getList';
    
    import type { TableColumn } from '@nuxt/ui';
    import type { Project } from '~/components/entities/project/model/types';

    const router = useRouter();
    const { t } = useI18n();

    const columns: TableColumn<Project>[] = [
        {
            accessorKey: 'title',
            header: t('project.table.field.title'),
            cell: ({ row }) => {
                const id: number = row.original.id;
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
            header: t('project.table.field.balance')
        }
    ];

    const data = ref<Project[]>([]);
    const loading = ref(false);
    
    const open = (event: Event, id: number) => {
        event.preventDefault();
        
        router.push(`/project/${id}`)
    }

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

<style src="~/assets/css/components/widgets/project/table.scss"></style>