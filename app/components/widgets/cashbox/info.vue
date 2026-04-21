<template>
    <div class="w-[50%]">
        <pre>{{ currentCashbox }}</pre>
        <!-- <apexchart
            type="donut"
            height="200"
            :options="options"
            :series="series"
        /> -->
    </div>

    <button @click="() => {
        rawData.push({title: 'test12', amount: 10})
    }">test</button>
</template>

<script setup lang="ts">
const cashboxStore = useCashboxStore();

const currentCashbox = computed(() => cashboxStore.getCurrent);

</script>
