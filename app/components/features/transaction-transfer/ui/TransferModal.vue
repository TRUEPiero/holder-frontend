<template>
    <Modal 
        :title="'test'" 
        :description="'описание'" 
        v-model="isOpen"
    >
        <template #actions>
            <TransferButton 
                @expense="expense"
                @income="income"/>
        </template>

        <template #body>
            <UForm :state="state" :schema="schema" @submit="submit">
                <UCarousel 
                    v-slot="{ item }" 
                    :items="fromItems" 
                    arrows 
                    class="CashboxSlider" 
                    :start-index="fromIndex"
                    @select="(index) => setFromId(index)"
                >
                    <p>{{ item.title }}</p>
                </UCarousel>
                <UCarousel 
                    v-slot="{ item }" 
                    :items="toItems" 
                    arrows 
                    class="CashboxSlider" 
                    :start-index="toIndex"
                    @select="(index) => setToId(index)"
                >
                    <p>{{ item.title }}</p>
                </UCarousel>

                <UFormField label="Сумма" name="amount" required>
                    <AmountInput v-model="state.amount"/>
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

                <div class="BaseModal__footer">
                    <Button :disabled="loading" :label="'Отправить'" type="submit"/>
                </div>
            </UForm>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue'
import Input from '~/components/shared/ui/input/index.vue'
import AmountInput from '~/components/shared/ui/input/amount/index.vue'
import Modal from '~/components/shared/ui/modal/index.vue'

import TransferButton from './TransferButton.vue';

import { useTags } from '../lib/tags';
import { useForm } from '../lib/form.js';
import { useCashboxes } from '../lib/cashboxes';
import { useTransfer } from '../lib/transfer.js';
import { useModal } from '~/components/shared/lib/modal.js';

const props = defineProps<{
    projectId: number,
    cashboxId: number
}>()

const cashboxStore = useCashboxStore();

const { transfer } = useTransfer();
const { state, schema, resetForm } = useForm();
const { isOpen, openModal, closeModal } = useModal();
const { tags, tag, createTag, fetchTags } = useTags(props.projectId);
const { fromId, toId, fromItems, toItems, fromIndex, toIndex, setActiveIds, setFromId, setToId } = useCashboxes(cashboxStore.cashboxes, props.cashboxId);

const loading = ref(false);

const income = () => {
    setActiveIds('income')
    openModal()
}

const expense = () => {
    setActiveIds('expense')
    openModal()
}

const submit = async () => {
    loading.value = true;

    const res = await transfer(props.projectId, fromId, toId, state, tag);
    if (!res) return;

    closeModal();
    resetForm();

    cashboxStore.setNeedUpdate([fromId.value, toId.value]);
    loading.value = false;
}

onMounted(async () => {
    await fetchTags();
})
</script>

<style src="~/assets/css/components/feature/transaction/transfer.scss"></style>