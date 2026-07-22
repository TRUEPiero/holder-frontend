<template>
    <Modal 
        :title="t('transaction.transfer.header')" 
        :description="t('transaction.transfer.description')" 
        v-model="isOpen"
    >
        <template #actions>
            <UCard class="Transfer__ActionBlock"
                :ui="{body: 'TransferAction__body'}"
            >
                <Button 
                    class="action"
                    icon="i-lucide-banknote-arrow-down"
                    color="neutral"
                    variant="subtle"
                    :label="'Пополнить'" 
                    @click.stop="income" 
                />
                <Button 
                    class="action"
                    icon="i-lucide-banknote-arrow-up"
                    color="neutral"
                    variant="subtle"
                    :label="'Перевести'" 
                    @click.stop="expense" 
                />
            </UCard>
        </template>

        <template #body>
            <UForm class="TransferForm" :state="state" :schema="schema" @submit="submit">
                <SelectCashbox
                    :items="fromItems"
                    :index="fromIndex"
                    @select="setFromId"
                />
                <SelectCashbox
                    :items="toItems"
                    :index="toIndex"
                    @select="setToId"
                />
                <UFormField class="field" :label="t('transaction.transfer.form.amount')" name="amount" required>
                    <AmountInput v-model="state.amount"/>
                </UFormField>
                <UFormField class="field" :label="t('transaction.transfer.form.description')" name="description">
                    <Input v-model="state.description"/>
                </UFormField>

                <UFormField class="field" :label="t('transaction.transfer.form.tag')" name="tag"> 
                    <UInputMenu 
                        :items="tags"
                        v-model="tag"
                        multiple
                        create-item
                        @create="createTag"
                    />
                </UFormField>

                <div class="BaseModal__footer">
                    <Button :disabled="loading" :label="t('transaction.transfer.form.submit')" type="submit"/>
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

import SelectCashbox from '~/components/entities/transaction/ui/CashboxSelect.vue';

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
const { t } = useI18n();

const { transfer } = useTransfer();
const { state, schema, resetForm } = useForm();
const { isOpen, openModal, closeModal } = useModal();
const { tags, tag, createTag, fetchTags } = useTags(props.projectId);
const { fromId, toId, fromItems, toItems, fromIndex, toIndex, setActiveIds, setFromId, setToId } = useCashboxes(cashboxStore.cashboxes);

const loading = ref(false);

const income = () => {
    setActiveIds('income', props.cashboxId)
    openModal()
}

const expense = () => {
    setActiveIds('expense', props.cashboxId)
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