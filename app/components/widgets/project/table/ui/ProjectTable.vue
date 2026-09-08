<template>
    <div class="ProjectTable">
        <div class="ProjectTable__main">
            
            <!-- action component -->
            <div class="ActionBlock">
                <CreateProject @created="getTableData"/>

                
            </div>

            <div class="ProjectTable__base">
                <UTable 
                    :data="data" 
                    :columns="columns" 
                    :empty="t('project.table.empty')"
                    class="ProjectTable__root rounded-xl ring ring-default" 
                />
            </div>
            
            <div class="ProjectTable__pagination">
                <UPagination
                    v-model:page="currentPage"
                    :total="pagination.totalPages * limit"
                    @update:page="getTableData"
                />
            </div>
                
        </div>
        <ProjectSettings v-if="settingModal.isOpen && projectId" :project-id="projectId" @close="() => {
            settingModal.closeModal()
            projectId = 0
        }"/>
    </div>

    <DeleteProject 
        v-model="deleteModal.isOpen.value" 
        :project-id="selected?.id" 
        @close="deleteModal.closeModal"
        @delete="deleteHandler"
    />
    <UpdateProject 
        v-model="editModal.isOpen.value" 
        :project="selected"
        @close="editModal.closeModal"
        @edit="editHandler"
    />
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue'
import CreateProject from '~/components/features/project-create/ui/CreateProject.vue';
import DeleteProject from '~/components/features/project-delete/ui/DeleteProject.vue';
import UpdateProject from '~/components/features/project-update/ui/UpdateProject.vue';
import ProjectSettings from '~/components/widgets/project/setting-groups/ui/ProjectSettingGroups.vue';

import { getProjects } from '~/components/entities/project/api/getList';

import type { DropdownMenuItem, TableColumn, TableRow } from '@nuxt/ui';
import type { Project } from '~/components/entities/project/model/types';
import { useModal } from '~/components/shared/lib/modal';
import { usePagination } from '../lib/pagination';

const { t } = useI18n();
const router = useRouter();
const editModal = useModal();
const deleteModal = useModal();
const settingModal = useModal();
const { currentPage, limit, pagination } = usePagination();

const projectId = ref<number>();

const UDropdownMenu = resolveComponent('UDropdownMenu');

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
                    onClick: (e) => goToProject(id)
                },
                row.getValue('title')
            )
        }
    },
    {
        accessorKey: 'balance',
        header: t('project.table.field.balance'),
        cell: ({ row }) => formatCurrency(Number(row.original.balance))
    },
    {
        accessorKey: 'actions',
        header: '',
        cell({row}) {
            return h(
                UDropdownMenu,
                {
                    items: getRowItems(row)
                },
                () => h(
                    Button,
                    {
                        icon: 'i-lucide-ellipsis-vertical',
                        color: 'neutral',
                        variant: 'ghost',
                    }
                )
            )
        },
    }
];

const loading = ref(false);
const data = ref<Project[]>([]);
const selected = ref<Project>();

const goToProject = (id: number) => {
    router.push(`/project/${id}`)
}

const getRowItems = (row: TableRow<Project>): DropdownMenuItem[] => {
    return [
        {
            label: t('project.table.actions.settings'),
            onSelect() {
                settingModal.openModal()
                projectId.value = row.original.id
            }
        },
        {
            label: t('project.table.actions.edit'),
            onSelect() {
                selected.value = row.original;
                editModal.openModal();
            }
        },
        {
            label: t('project.table.actions.delete'),
            onSelect() {
                selected.value = row.original;
                deleteModal.openModal();
            }
        },
    ]
}

const getTableData = async () => {
    loading.value = true;

    const result = await getProjects(currentPage.value, limit);
    if(!result) return;

    data.value = result.data.items;
    pagination.value = result.data.pagination;

    loading.value = false;
}

const deleteHandler = async () => {
    loading.value = true;

    deleteModal.closeModal();

    await getTableData();

    loading.value = true;
}
const editHandler = async () => {
    loading.value = true;

    editModal.closeModal();

    await getTableData();

    loading.value = true;
}

onMounted(async () => {
    await getTableData();
})
</script>

<style src="~/assets/css/components/widgets/project/table.scss"></style>