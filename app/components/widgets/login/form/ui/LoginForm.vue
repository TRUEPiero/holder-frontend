<template>
    <UCard 
        class="AuthModal"
        :ui="{header: 'AuthModal__header'}"    
    >
        <template #header>
            <h2 class="text-center">{{ t('auth.form.header') }}</h2>
        </template>
        <AuthByEmailForm />
    </UCard>
</template>

<script lang="ts" setup>
    import AuthByEmailForm from '~/components/features/login/ui/AuthByEmailForm.vue';

    const { t } = useI18n();
</script>