<template>
    <Modal v-model="isOpen" :title="t('project.create.header')" :description="t('project.create.description')">

        <template #actions>
            <Button :icon="'i-lucide-circle-plus'" @click="openModal" />
        </template>

        <template #body>
            <UForm class="CreateProjectForm" :state="state" :schema="schema" @submit="submit">
                <UFormField class="field" :label="t('project.create.form.title')" name="title" required>
                    <Input v-model="state.title"/>
                </UFormField>

                <div class="BaseModal__footer">
                    <Button :label="t('project.create.form.submit')" type="submit"/>
                </div>
            </UForm>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue';
import Input from '~/components/shared/ui/input/index.vue';
import Modal from '~/components/shared/ui/modal/index.vue';

import { useModal } from '~/components/shared/lib/modal';
import { useForm } from '../lib/form';
import { createProject } from '~/components/entities/project/api/create';

const { t } = useI18n();

const { isOpen, openModal, closeModal } = useModal();
const { schema, state, resetForm } = useForm();

const emits = defineEmits(['created'])

const submit = async () => {

    const res = await createProject(state);
    if(!res) return;

    closeModal();
    resetForm();

    emits('created')
}
</script>
