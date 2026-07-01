<template>
    <Modal v-model="isOpen" :title="t('cashbox.create.header')" :description="t('cashbox.create.description')">

        <template #actions>
            <Button :label="t('cashbox.create.add')" @click="openModal" />
        </template>
        
        <template #body>
            <UForm class="CreateCashboxForm" :state="state" :schema="schema" @submit="submit"> 
                <UFormField class="field" :label="t('cashbox.create.form.title')" name="title" required>
                    <Input v-model="state.title"/>
                </UFormField>
                
                <UFormField class="field" :label="t('cashbox.create.form.description')" name="description">
                    <Input v-model="state.description"/>
                </UFormField>

                <div class="BaseModal__footer">
                    <Button :label="t('cashbox.create.form.submit')" type="submit"/>
                </div>
            </UForm>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue';
import Input from '~/components/shared/ui/input/index.vue';
import Modal from '~/components/shared/ui/modal/index.vue';

import { useForm } from '../lib/form';
import { useModal } from '~/components/shared/lib/modal';

import { createCashbox } from '~/components/entities/cashbox/api/create';

const { t } = useI18n();

const props = defineProps<{
    projectId: number
}>()

const emits = defineEmits(['created'])

const { state, schema, resetForm } = useForm()
const { isOpen, openModal, closeModal } = useModal();

const loading = ref(false);

const submit = async () => {
    loading.value = true
    
    const res = await createCashbox(props.projectId, state);
    if(!res) return;
    
    closeModal();
    resetForm();

    emits('created');

    loading.value = false;
}
</script>

<style src="~/assets/css/components/feature/cashbox/create.scss"></style>