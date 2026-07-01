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
                <p v-if="!edit">{{ t('cashbox.item.title') }}: {{ cashbox.title }}</p>
                <Input v-else v-model="editData.title" class="max-w-xs" @click.stop/>
                
                <p v-if="!edit">{{ t('cashbox.item.description') }}: {{ cashbox.description }}</p>
                <Input v-else v-model="editData.description" class="max-w-xs" @click.stop/>

                <p>{{ t('cashbox.item.balance') }}: {{ cashbox.balance }}</p>
            </UCard>

            <!-- action block -->
            <div class="CashboxItem__actions">
                <EditCashbox :editing="edit" :changed="isChanged" :loading="loading"
                    @start="startEdit"
                    @cancel="stopEdit"
                    @save="editCashbox"
                />
                
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

import { useEdit } from '../lib/edit';

import { getById } from '~/components/entities/cashbox/api/getById';
import { updateCashbox } from '~/components/entities/cashbox/api/update';

import type { Cashbox } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
    cashboxId: number
    activeId: number | null
}>()
const emits = defineEmits(['setActive'])

const cashboxStore = useCashboxStore();
const { t } = useI18n();

const loading = ref(false);
const cashbox = ref<Cashbox | undefined>();

const { edit, editData, isChanged, startEdit, stopEdit } = useEdit(cashbox);

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

const editCashbox = async () => {
    if (!isChanged.value) {
        stopEdit();
        return
    }

    loading.value = true;

    const res = await updateCashbox(props.projectId, props.cashboxId, editData);
    if(!res) return;

    stopEdit();

    await getDetailInfo();

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