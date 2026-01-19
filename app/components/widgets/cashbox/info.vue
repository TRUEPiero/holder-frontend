<template>
    <div class="w-[50%]">
        <!-- <pre>{{ currentCashbox }}</pre> -->
        <apexchart
            type="donut"
            height="200"
            :options="options"
            :series="series"
        />
    </div>

    <button @click="() => {
        rawData.push({title: 'test12', amount: 10})
    }">test</button>
</template>

<script setup lang="ts">
    const cashboxStore = useCashboxStore();

    const currentCashbox = computed(() => cashboxStore.getCurrent);

const rawData = ref([
    {
        title: 'iPhone 15 Pro',
        amount: 100,
    },
    {
        title: 'test',
        amount: 90,
    },
    {
        title: 'test 1',
        amount: 0
    }
]);

const series = [{
    name: 'Q1 Revenue',
    data: rawData.value,
    parsing: {
        x: 'title',
        y: 'amount'
    }
}]
    const options = ref({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        legend: {
            show: true
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            align: 'left'
        },
        grid: {
            row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
            }
        }

    })
</script>
