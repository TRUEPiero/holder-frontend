<template>
    <div class="ProjectInfo">
        <Loader v-if="loading" class="w-[250px]"/>

        <div v-else>
            <p class="ProjectInfo__header">{{ projectData?.title }}</p>
            <div v-if="cashbox" class="CashboxInfo__main" >
                <Transfer
                    :project-id="projectId"
                    :cashbox-id="cashbox.id"
                />

                <TransactionHistory />
            </div>
            <div v-else class="ProjectInfo__main">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Loader from '~/components/shared/ui/loader/index.vue';

import Transfer from '~/components/features/transaction-transfer/ui/TransferModal.vue';
import TransactionHistory from '~/components/features/transaction-history/ui/TransactionHistory.vue';

import { getById } from '~/components/entities/project/api/getById';
import { useProjectStore } from '~/stores';

import type { Project } from '~/components/entities/project/model/types';

const props = defineProps<{
    projectId: number
}>()

const projectStore = useProjectStore();
const cashboxStore = useCashboxStore();

const projectData = ref<Project>();
const loading = ref(false);

const cashbox = computed(() => cashboxStore.active)

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

<style src="~/assets/css/components/widgets/project/info.scss"></style>