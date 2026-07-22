<template>
    <Modal v-model="isOpen" :title="t('project.delete.header')" :description="t('project.delete.description')">
        <template #body>
            <p>{{ t('project.delete.content') }}</p>


            <div class="BaseModal__footer">
                <Button variant="outline" :label="t('project.delete.cancel')" @click="emits('close')"/>
                <Button color="error" :label="t('project.delete.submit')" @click="deleteProject"/>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/shared/ui/modal/index.vue';
import Button from '~/components/shared/ui/button/index.vue';

import { deleteProjectById } from '~/components/entities/project/api/delete';

const { t } = useI18n();

const isOpen = defineModel<boolean>()
const emits = defineEmits(['close', 'delete']);
const props = defineProps<{
    projectId?: number
}>()

const loading = ref(false);

const deleteProject = async () => {
    if(!props.projectId) return;

    loading.value = true;
    
    const res = await deleteProjectById(props.projectId);
    if(!res) return;

    emits('delete');
    loading.value = false;
}
</script>