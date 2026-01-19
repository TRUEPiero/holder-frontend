<template>
    <h1>{{ currentProject?.title }}</h1>
    <div class="flex flex-row w-full">
        <CashboxInfo/>
        <CashboxList/>
    </div>
</template>

<script setup lang="ts">
    import CashboxList from '~/components/widgets/cashbox/index.vue';
    import CashboxInfo from '~/components/widgets/cashbox/info.vue'

    const projectStore = useProjectStore();

    const currentProject = computed(() => projectStore.getProject);
</script>
