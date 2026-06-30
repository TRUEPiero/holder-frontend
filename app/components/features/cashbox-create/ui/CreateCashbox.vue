<template>
    <Modal v-model="isOpen">

        <template #actions>
            <Button :label="'Добавить'" @click="openModal" />
        </template>
        
        <template #body>
            <UForm :state="state" :schema="schema" @submit="submit"> 
                <UFormField label="Title" name="title" required>
                    <Input v-model="state.title"/>
                </UFormField>
                
                <UFormField label="Description" name="description">
                    <Input v-model="state.description"/>
                </UFormField>

                <Button :label="'Создать'" type="submit"/>
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


const props = defineProps<{
    projectId: number
}>()

const emit = defineEmits(['created'])

const { state, schema, resetForm } = useForm()
const { isOpen, openModal, closeModal } = useModal();

const loading = ref(false);

const submit = async () => {
    loading.value = true
    
    const res = await createCashbox(props.projectId, state);
    if(!res) return;
    
    closeModal();
    resetForm();

    emit('created');

    loading.value = false;
}
</script>