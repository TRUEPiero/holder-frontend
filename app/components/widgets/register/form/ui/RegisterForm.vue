<template>
    <UCard
        class="RegisterModal"
        :ui="{header: 'RegisterModal__header'}"
    > 
        <template #header>
            <h2 class="text-center">{{ t('register.form.header') }}</h2>
        </template>

        <RegisterByEmail />
    </UCard>
</template>

<script setup lang="ts">
import RegisterByEmail from '~/components/features/register/ui/RegisterByEmail.vue';

const { t } = useI18n();
</script>