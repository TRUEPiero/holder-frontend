<template>
    <UCollapsible
        v-if="cashbox"
        class="CashboxItem"
        :ui="{content: 'CashboxItem__detail'}"
        v-model:open="active"
        @update:open="openCashbox"
    >
        <div class="CashboxItem__preview">
            <UCard
                class="CashboxItem__card"
                :ui="{body: 'CashboxCard__root'}"
            >
                <p>ID: {{ cashbox.id }}</p>
                
                <p v-if="!edit">title: {{ cashbox.title }}</p>
                <Input v-else v-model="cashbox.title" class="max-w-xs"/>
                
                <p v-if="!edit">description: {{ cashbox.description }}</p>
                <Input v-else v-model="cashbox.description" class="max-w-xs"/>

                <p>balance: {{ cashbox.balance }}</p>
            </UCard>

            <!-- action block -->
            <div class="CashboxItem__actions">
                <EditCashbox />
                
                <DeleteCashbox 
                    :project-id="projectId"
                    :cashbox-id="cashboxId"
                />
            </div>
        </div>

        <template #content>
            <Transfer 
                :project-id="projectId"
                :cashbox-id="cashboxId"
            />
        </template>
    </UCollapsible>
</template>

<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue';

import EditCashbox from '~/components/features/cashbox-edit/ui/EditCashbox.vue';
import DeleteCashbox from '~/components/features/cashbox-delete/ui/DeleteCashbox.vue';
import Transfer from '~/components/features/transaction-transfer/ui/TransferModal.vue';

import { getById } from '~/components/entities/cashbox/api/getById';

import type { Cashbox } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
    cashboxId: number
    activeId: number | null
}>()
const emits = defineEmits(['setActive'])

const cashboxStore = useCashboxStore();

const loading = ref(false);
const edit = ref(false);
const cashbox = ref<Cashbox | undefined>();

const active = computed(() => props.activeId === props.cashboxId)
const updatedIds = computed(() => cashboxStore.needUpdate)

const openCashbox = (value: boolean) => {
    const actived = value ? props.cashboxId : null;
    emits('setActive', actived);
}

const getDetailInfo = async () => {
    loading.value = true;

    const res = await getById(props.projectId, props.cashboxId);
    if(!res) return;

    cashbox.value = res.data;

    loading.value = false;
}

watch(updatedIds, async (value) => {
    if(value.includes(props.cashboxId)) {
        await getDetailInfo();
        cashboxStore.setNeedUpdate([]);
    }
})

onMounted(async () => {
    await getDetailInfo()
})
</script>

<style src="~/assets/css/components/widgets/cashbox/item.scss"></style>