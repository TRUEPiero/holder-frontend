<template>
    <Button
        v-if="!editing"
        icon="i-lucide-edit"
        variant="soft"
        @click.stop="emits('start')"
    />

    <template v-else>
        <Button
            icon="i-lucide-check"
            variant="soft"
            :disabled="!changed || loading"
            @click.stop="emits('save')"
        />

        <Button
            icon="i-lucide-x"
            color="error"
            variant="soft"
            @click.stop="emits('cancel')"
        />
    </template>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue';

const props = defineProps<{
    editing: boolean
    changed?: boolean
    loading?: boolean
}>()

const emits = defineEmits(['start', 'save', 'cancel'])
</script>