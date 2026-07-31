<template>
    <div class="GroupSetting"
        v-for="setting in settings"
    >
        <ProjectSetting 
            :setting="setting"
        />
    </div>
</template>

<script setup lang="ts">
import ProjectSetting from '~/components/entities/setting/ui/setting.vue';

import { getByGroup } from '~/components/entities/setting/api/getByGroup';

const props = defineProps<{
    projectId: number,
    groupId: number
}>()

const loading = ref(false);
const settings = ref<[]>([]);

const getSettings = async () => {
    loading.value = true;

    const res = await getByGroup('project', props.projectId, props.groupId)
    if(!res) return 

    settings.value = res.data;

    loading.value = false;
}

onMounted(async () => {
    await getSettings();
})
</script>