<template>
    <div class="TransactionHistory">
        <p class="TransactionHistory__header">{{ t('transaction.history.header') }}</p>

        <UCollapsible
            class="TransactionHistory__main"
        >
            
            <template #content>

            </template>
        </UCollapsible>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style src="~/assets/css/components/feature/transaction/history.scss"></style>