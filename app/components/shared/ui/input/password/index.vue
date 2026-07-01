<template>
    <UInput
        class="Input"
        :ui="{base: 'Input__base'}"
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

<style src="~/assets/css/components/shared/input/index.scss"></style>