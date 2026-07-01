<template>
    <Modal v-model="isOpen" :title="t('cashbox.delete.header')" :description="t('cashbox.delete.description')">
        <template #actions>
            <Button class="action" icon="i-lucide-trash" variant="soft" @click.stop="openModal()"/>
        </template>

        <template #body>
            <p>{{ t('cashbox.delete.content') }}</p>

            <div class="BaseModal__footer">
                <Button variant="outline" :label="t('cashbox.delete.cancel')" @click="closeModal()"/>
                <Button color="error" :label="t('cashbox.delete.submit')" @click="submit"/>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/shared/ui/modal/index.vue'
import Button from '~/components/shared/ui/button/index.vue'

import { deleteCashbox } from '~/components/entities/cashbox/api/delete';

import { useModal } from '~/components/shared/lib/modal';

const props = defineProps<{
    projectId: number,
    cashboxId: number
}>()

const cashboxStore = useCashboxStore();
const { t } = useI18n();

const { isOpen, openModal, closeModal } = useModal();

const loading = ref(false);

const submit = async () => {
    loading.value = true;

    const res = await deleteCashbox(props.projectId, props.cashboxId);
    if(!res) return;

    cashboxStore.setNeedReload(true);
    loading.value = false;
}
</script>