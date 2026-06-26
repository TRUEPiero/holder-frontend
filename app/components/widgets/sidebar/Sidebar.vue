<template>
    <USidebar 
        class="Sidebar"
        variant="inset"
        collapsible="icon"
        v-model:open="open"
        :ui="{
            header: 'Sidebar__header',
        }"
    >

        <template #header>
            <p>logo</p>
            <UButton 
                class="closeIcon"
                icon="i-lucide-chevron-left"
                variant="soft"
                @click="toggleSidebar"
            />
        </template>

        <template #footer>
            
        </template>
    </USidebar>
</template>

<script setup lang="ts">
const open = ref(true)

const toggleSidebar = () => {
    open.value = !open.value
}
</script>

<style src="~/assets/css/components/widgets/sidebar/index.scss"></style>