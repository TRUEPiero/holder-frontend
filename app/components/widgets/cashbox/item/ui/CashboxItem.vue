<template>
    <UCollapsible
        v-model:open="isOpen"
        @update:open="openCashbox"
        class="CashboxItem"
        :ui="{
            content: 'CashboxItem__detail',
        }"
    >
        <UCard
            class="CashboxItem__card"
            :ui="{
                body: 'CashboxCard__root'
            }"
        >
            <p>ID: {{ cashbox.id }}</p>
            <p>title: {{ cashbox.title }}</p>
            <p>description: {{ cashbox.description }}</p>
            <p>balance: {{ cashbox.balance }}</p>
        </UCard>

        <template #content>
            <Transfer />
        </template>
    </UCollapsible>
</template>

<script setup lang="ts">
import Transfer from '~/components/features/transaction/ui/Transfer.vue';

import type { Cashbox } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
    cashbox: Cashbox
    activeId: number | null
}>()

const emits = defineEmits(['setActive'])

const isOpen = computed(() => props.activeId === props.cashbox.id)

const openCashbox = (value: boolean) => {
    const actived = value ? props.cashbox.id : null;

    emits('setActive', actived);
}
</script>

<style src="~/assets/css/components/widgets/cashbox/item.scss"></style>