<template>
    <div class="ProjectSettings">
        <UCard 
            class="SettingCard"
            variant="subtle"
            :ui="{body: 'SettingCard__body'}"
        >
            <Loader v-if="loading" class="w-[250px]"/>

            <div v-else class="ProjectSettings__main">
                <div class="SettingGroups">
                    <div class="SettingGroup" v-for="group in groups" key="id">
                        <p class="SettingGroup__header">{{ group.title }}</p>

                        <GroupSettings 
                            :project-id="projectId"
                            :group-id="group.id"
                        />
                    </div>

                    <div class="ActionBlock">
                        <Button label="Закрыть" variant="subtle" @click="emits('close')"/>

                        <Button label="Сохранить"/>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import Loader from '~/components/shared/ui/loader/index.vue';
import Button from '~/components/shared/ui/button/index.vue';
import GroupSettings from '~/components/features/settings/ui/GroupSettings.vue';
import { getGroups } from '~/components/entities/setting/api/getGroups';

import type { Group } from '~/components/entities/setting/model/type';

const emits = defineEmits(['close'])

const props = defineProps<{
    projectId: number
}>()

const loading = ref(false);
const groups = ref<Group[]>([]);

const getGroupList = async () => {
    loading.value = true;

    const res = await getGroups('project', props.projectId);
    if(!res) return;

    groups.value = res.data;

    loading.value = false;
}

onMounted( async () => {
    await getGroupList();
})
</script>

<style src="~/assets/css/components/widgets/project/settings.scss"></style>