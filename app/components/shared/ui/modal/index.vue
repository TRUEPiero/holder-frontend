<template>
    <UModal
        :title="title"
        :description="description"
        v-model:open="isOpen"
        class="BaseModal"    
        :ui="{header: 'BaseModal__header', body: 'BaseModal__body'}"
    >
        <slot name="actions"/>

        <template #body>
            <slot name="body"/>
        </template>
    </UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>()
const props = defineProps<{
    title?: string
    description?: string
}>()
</script>

<style src="~/assets/css/components/shared/modal/index.scss"></style>