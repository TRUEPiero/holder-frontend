<template>
    <ProjectTable/>
</template>

<script setup lang="ts">
    import ProjectTable from '~/components/widgets/project/table/ui/ProjectTable.vue';
        
    definePageMeta({
        layout: 'without-sidebar'
    })
</script>