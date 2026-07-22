<template>
        <div class="CashboxItem"
             v-if="cashbox"    
        >
            <UCard
                class="CashboxItem__card"
                :ui="{body: 'CashboxCard__root'}"
            >               
                <CashboxField v-model="editData"
                    :edit="edit"
                    :is-editable="true"
                    :cashbox="cashbox"
                    name="title"
                />

                <CashboxField v-model="editData"
                    :edit="edit"
                    :is-editable="true"
                    :cashbox="cashbox"
                    name="description"
                />
                
                <CashboxField v-model="editData"
                    :is-editable="false"
                    :cashbox="cashbox"
                    name="balance"
                />
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
</template>

<script setup lang="ts">
import CashboxField from '~/components/entities/cashbox/ui/field.vue';

import EditCashbox from '~/components/features/cashbox-edit/ui/EditCashbox.vue';
import DeleteCashbox from '~/components/features/cashbox-delete/ui/DeleteCashbox.vue';

import { useEdit } from '../lib/edit';

import { getById } from '~/components/entities/cashbox/api/getById';
import { updateCashbox } from '~/components/entities/cashbox/api/update';

import type { Cashbox } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
    cashboxId: number
}>()
const emits = defineEmits(['setActive'])

const cashboxStore = useCashboxStore();

const loading = ref(false);
const cashbox = ref<Cashbox | undefined>();

const { edit, editData, isChanged, startEdit, stopEdit } = useEdit(cashbox);

const updatedIds = computed(() => cashboxStore.needUpdate)

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
        const filtered = value.filter(id => id !== props.cashboxId);

        cashboxStore.setNeedUpdate(filtered);
    }
})

onMounted(async () => {
    await getDetailInfo()
})
</script>

<style src="~/assets/css/components/widgets/cashbox/item.scss"></style>