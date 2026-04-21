<template>
    <div class="w-[50%] bg-gray-500/25 rounded-[10px] p-[10px]">
        <div class="Actions flex flex-row">
            <Button icon="i-lucide-circle-plus" @click="() => modalCreateOpen = true"/>
            <Button icon="i-lucide-square-pen"/>
            <Button icon="i-lucide-trash-2"/>
        </div>
        <CashboxTree/>
    </div>
    <UModal v-model:open="modalCreateOpen">
        <template #body>
            <UForm :state="state" @submit="createCashbox">
                <UFormField label="title" name="title">
                    <Input v-model="state.title"/>
                </UFormField>
                <UFormField label="description" name="description">
                    <Input v-model="state.description"/>
                </UFormField>
                <UFormField label="amount" name="amount">
                    <Input v-model="state.amount" type="number"/>
                </UFormField>
                <div class="flex flex-row justify-end">
                    <Button label="Отмена" @click="modalCreateOpen = false"/>

                    <Button label="Создать" type="submit"/>
                </div>
            </UForm>
        </template>
    </UModal>
</template>

<script setup lang="ts">
    import CashboxTree from '~/components/features/CashboxTree/ui/index.vue';
    import Button from '~/components/shared/button/index.vue';
    import Input from '~/components/shared/input/index.vue';

    const cashboxStore = useCashboxStore();

    const state = reactive({
        title: '',
        description: '',
        amount: 0,
    })

    const modalCreateOpen = ref(false)

    const createCashbox = () => {

        modalCreateOpen.value = false;
    }
</script>
