<template>
    <UTree
        :items="cashboxes"
        label-key="id"
        v-model="value"
        @update:model-value="(value: any) => setCurrentCashbox(value)"
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

    type Value = any

    const cashboxStore = useCashboxStore();
    const projectStore = useProjectStore();

    const value: Value = ref(null)

    const cashboxes = computed(()=> cashboxStore.getAll);
    const project = computed(() => projectStore.getProject); 

    const setCurrentCashbox = async (cashbox: any) => {

    }

    const fetchCashbox = async (projectId: number) => {

    }

    onMounted(() => {

    })
</script>
