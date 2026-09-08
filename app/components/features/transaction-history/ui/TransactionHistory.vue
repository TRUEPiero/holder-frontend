<template>
    <div class="TransactionHistory">
        <!-- <p class="TransactionHistory__header">{{ t('transaction.history.header') }}</p> -->

        <UAccordion :items="items">
            <template #history="{item}">
                {{ item }}
            </template>
        </UAccordion>
    </div>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const { t } = useI18n();

const items = ref<AccordionItem[]>([
    {
        label: t('transaction.history.header'),
        slot: 'history' as const
    }
])
</script>

<style src="~/assets/css/components/feature/transaction/history.scss"></style>