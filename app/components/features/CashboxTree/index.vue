<template>
    <UTree
        :items="cashboxes"
        label-key="id"
        v-model="value"
        @update:model-value="(value) => setCurrentCashbox(value)"
        :ui="{item: 'border-1 border-[#000] rounded-[10px] my-[5px]'}"
        >
            <template #item="{item}">
                <CashboxNode
                    :item="item"
                />
            </template>
    </UTree>
</template>

<script setup lang="ts">
    import CashboxNode from '~/components/entities/CashboxNode/index.vue';

    const cashboxStore = useCashboxStore();

    const value = ref(null)

    const cashboxes = computed(()=> cashboxStore.getCashboxes);

    const setCurrentCashbox = async (cashbox: any) => {
        if(!cashbox) {
            cashboxStore.clearCurrentCashbox();
            return
        }
        await cashboxStore.getCurrentCashbox(cashbox?.id);
    }

    onMounted(() => {
        cashboxStore.fetchCashboxes();
    })
</script>
