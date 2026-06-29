<template>
    <UModal 
        v-model:open="isOpen"
    >
        <Button :label="'Пополнить'" @click="() => {
            setActiveIds('income')
            openModal()
        }" />
        <Button :label="'Перевести'" @click="() => {
            setActiveIds('expense')
            openModal()
        }" />

        <template #content>
            <UCarousel 
                v-slot="{ item }" 
                :items="fromItems" 
                arrows 
                class="w-full max-w-xs mx-auto" 
                :start-index="fromIndex"
                @select="(index) => setFromId(index)"
            >
                <p>{{ item.title }}</p>
            </UCarousel>
            <UCarousel 
                v-slot="{ item }" 
                :items="toItems" 
                arrows 
                class="w-full max-w-xs mx-auto" 
                :start-index="toIndex"
                @select="(index) => setToId(index)"
            >
                <p>{{ item.title }}</p>
            </UCarousel>

            <UFormField label="Сумма" name="amount" required>
                <Input v-model="state.amount"/>
            </UFormField>
            <UFormField label="Description" name="description">
                <Input v-model="state.description"/>
            </UFormField>

            <UFormField :label="'Tag'" name="tag"> 
                <UInputMenu 
                    :items="tags"
                    v-model="tag"
                    multiple
                    create-item
                    @create="createTag"
                />
            </UFormField>

            <Button :disabled="loading" :label="'Отправить'" @click="transfer"/>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue'
import Input from '~/components/shared/ui/input/index.vue'

import type { TransactionTag, TransferType } from '~/components/entities/transaction/model/types';
import type { Cashbox } from '~/components/entities/cashbox/model/types';
import { internalTransfer } from '~/components/entities/transaction/api/internalTransfer';
import { getTags } from '~/components/entities/transaction/api/getTags';
import { externalTransfer } from '~/components/entities/transaction/api/externalTransfer';

type External = {
    id: number
    title: string
}

const props = defineProps<{
    projectId: number,
    cashbox: Cashbox
}>()

const cashboxStore = useCashboxStore();

const state = reactive({
    amount: '',
    description: '',
})

const loading = ref(false);
const isOpen = ref(false);
const fromId = ref<number>(0);
const toId = ref<number>(0);
const tags = ref<string[]>([])
const tag = ref()

const allCashboxes = computed<(Cashbox | External)[]>(() => {
    return [
        {id: 0, title: 'Внешний счет/траты'},
        ...cashboxStore.cashboxes
    ]
})
const fromItems = computed(() => allCashboxes.value.filter((i) => i.id !== toId.value))
const fromIndex = computed(() => fromItems.value.findIndex(i => i.id === fromId.value))

const toItems = computed(() => allCashboxes.value.filter((i) => i.id !== fromId.value))
const toIndex = computed(() => toItems.value.findIndex(i => i.id === toId.value))
    
const setActiveIds = (mode: TransferType) => {
    fromId.value = mode === 'expense' ? props.cashbox.id : 0;
    toId.value = mode === 'income' ? props.cashbox.id : 0;
}

const setFromId = (index: number) => {
    fromId.value = fromItems.value[index]!.id
}

const setToId = (index: number ) => {
    toId.value = toItems.value[index]!.id
}

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false;
}

const createTag = (item: string) => {
  tags.value.push(item)
  tag.value = [item]
}

const fetchTags = async () => {
    const res = await getTags(props.projectId);
    if(!res) return;

    tags.value = res.data.map((i: TransactionTag) => i.title)
}

const transfer = async () => {
    
    loading.value = true;

    let res = null;

    if(!fromId.value || !toId.value) {
        const cashboxId = fromId.value || toId.value;

        const params = {
            type: fromId.value ? 'expense' : 'income' as TransferType,
            amount: Number(state.amount),
            description: state.description,
            tag: tag.value?.length ? {
                title: tag.value[0]
            } : undefined
        };

        res = await externalTransfer(props.projectId, cashboxId, params)
    } else {
        const params = {
            to: toId.value,
            amount: Number(state.amount),
            description: state.description,
            tag: tag.value?.length ? {
                title: tag.value[0]
            } : undefined
        };

        res = await internalTransfer(props.projectId, fromId.value, params)
    }

    if(!res) return;

    loading.value = false;
    closeModal();
}

onMounted(async () => {
    await fetchTags();
})
</script>