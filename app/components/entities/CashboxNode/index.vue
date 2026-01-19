<template>
    <div class="cashbox-node flex flex-row h-[70px]">
        <div class="cashbox-node__amount w-[80px]">
            <span class="">{{ item.amount }}</span>
        </div>
        <div class="cashbox-node__info text-start">
            <p>{{item.title}}</p>
            <p>{{item.description}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    const prop = defineProps(['item'])
</script>
