<template>
    <UInput
        class="Input"
        :ui="{base: 'Input__base'}"
        v-model="value" 
    />
</template>

<script setup lang="ts">
const value = defineModel<string>()
</script>

<style src="~/assets/css/components/shared/input/index.scss"></style>