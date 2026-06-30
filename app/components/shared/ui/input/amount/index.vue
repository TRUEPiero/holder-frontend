<template>
    <UInput
        v-model="value" 
    />
</template>

<script setup lang="ts">
const value = defineModel<string>()
</script>