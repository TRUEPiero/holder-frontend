<template>
    <Modal v-model="isOpen">
        <template #actions>
            <Button class="action" icon="i-lucide-trash" variant="soft" @click.stop="openModal()"/>
        </template>

        <template #body>
            u`re sure?

            <div class="BaseModal__footer">
                <Button label="test" @click="closeModal()"/>
                <Button label="test" @click="submit"/>
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