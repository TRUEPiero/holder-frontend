<template>
    <UModal
        v-model:open="isOpen"
    >
        <Button :label="'Добавить'" @click="openModal" />
        
        <template #content>
            <UFormField label="Title" required>
                <UInput v-model="createData.title"/>
            </UFormField>
            
            <UFormField label="Description">
                <UInput v-model="createData.description"/>
            </UFormField>

            <Button :label="'Создать'" @click="create"/>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue';
import { createCashbox } from '~/components/entities/cashbox/api/create';

import type { CreateData } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
}>()

const emit = defineEmits(['created'])

const isOpen = ref(false);
const loading = ref(false);

const createData: CreateData = reactive({
    title: '',
    description: ''
})

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const clearForm = () => {
    createData.title = '';
    createData.description = '';
}

const create = async () => {
    loading.value = true
    
    const res = await createCashbox(props.projectId, createData);
    if(!res) return;
    
    closeModal();
    clearForm();

    emit('created');

    loading.value = false;
}
</script>