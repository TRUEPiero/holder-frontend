<template>
    <div class="flex flex-row hidden piero">
        <pre>{{ projectStore.getProject }}</pre>
        <pre>{{ userStore.getUser }}</pre>
    </div>

    <h1>{{ currentProject?.title }}</h1>

    <Button @click="console.log('test')"/>
</template>

<script setup lang="ts">
    import { useUserStore, useProjectStore } from '~/stores';
    import Button from '~/components/shared/button/index.vue';

    const projectStore = useProjectStore();
    const userStore = useUserStore();

    const currentProject = computed(() => projectStore.getProject);
</script>
