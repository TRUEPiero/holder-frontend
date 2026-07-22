<template>
    <Modal v-model="isOpen" :title="t('project.edit.header')" :description="t('project.edit.description')">
        <template #body>
            <UForm :state="state" :schema="schema" @submit="submit">
                <UFormField class="field" :label="t('project.update.form.title')" name="title" required>
                    <Input v-model="state.title"/>
                </UFormField>

                <div class="BaseModal__footer">
                    <Button variant="outline" :label="t('project.edit.cancel')" @click="emits('close')"/>
                    <Button :label="t('project.edit.submit')" type="submit"/>
                </div>
            </UForm>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/shared/ui/modal/index.vue';
import Input from '~/components/shared/ui/input/index.vue';
import Button from '~/components/shared/ui/button/index.vue';

import { updateProject } from '~/components/entities/project/api/udpate';

import type { Project } from '~/components/entities/project/model/types';
import { useForm } from '../lib/form';

const { t } = useI18n();
const { state, schema, resetForm } = useForm();

const isOpen = defineModel<boolean>()
const emits = defineEmits(['close', 'edit']);
const props = defineProps<{
    project?: Project
}>()

const loading = ref(false);

const submit = async () => {
    if(!props.project) return;

    loading.value = true;

    const res = await updateProject(props.project.id, state);
    if(!res) return;

    resetForm();
    emits('edit');

    loading.value = false;
}

watch(props, (value) => {
    state.title = value.project?.title || '';
})
</script>