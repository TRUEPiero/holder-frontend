<template>
    <div class="flex w-full h-[calc(100vh-72px)]">
        <ProjectInfo :project-id="projectId" />
        <CashboxList :project-id="projectId" />
    </div>
</template>

<script setup lang="ts">
import ProjectInfo from '~/components/widgets/project/info/ui/ProjectInfo.vue';
import CashboxList from '~/components/widgets/cashbox/list/ui/CashboxList.vue';

const route = useRoute();

const projectId = Number(route.params.id);
</script>