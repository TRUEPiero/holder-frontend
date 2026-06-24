<template>
    <ProjectTable/>
</template>

<script setup lang="ts">
    import ProjectTable from '~/components/widgets/project/table/ui/ProjectTable.vue';
    import { useUserStore } from '~/stores';
    
    const userStore = useUserStore();

</script>