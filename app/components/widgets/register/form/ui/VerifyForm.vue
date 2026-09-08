<template>
    <UCard 
        class="RegisterModal"
        :ui="{header: 'RegisterModal__header'}"    
    >
        <template #header>
            <h2 class="text-center">{{ t('register.verify.form.header') }}</h2>
        </template>
        <SendVerify />
    </UCard>
</template>

<script setup lang="ts">
import SendVerify from '~/components/features/register-verify/ui/SendVerify.vue';

const { t } = useI18n();
</script>