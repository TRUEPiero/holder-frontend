<template>
    <UModal
        v-model:open="isOpen"
    >
        <UButton :label="'Пополнить'" @click="() => openModal('income')"/>
        <UButton :label="'Перевести'" @click="() => openModal('expense')"/>

        <template #content>
            test
        </template>
    </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false);
import type { TransferType } from '~/components/entities/transaction/model/types';

const openModal = (mode: TransferType) => {
    isOpen.value = true
}
</script>