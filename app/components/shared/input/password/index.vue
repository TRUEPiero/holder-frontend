<template>
    <UInput
        :type="!hidden ? 'text' : 'password'"
    >
        <template #trailing>
            <UIcon
                :name="hidden ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                @click="hidden = !hidden"
            />
        </template>
    </UInput>
</template>

<script lang="ts" setup>
    const hidden = ref(true)

</script>

<style>

</style>
