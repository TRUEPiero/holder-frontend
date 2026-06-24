<template>
    <UCard>
        <template #header>
            <h2 class="text-center">{{ t('form.header.login') }}</h2>
        </template>
        <AuthByEmailForm />
    </UCard>
</template>

<script lang="ts" setup>
    import AuthByEmailForm from '~/components/features/login/ui/AuthByEmailForm.vue';

    const { t } = useI18n();
</script>