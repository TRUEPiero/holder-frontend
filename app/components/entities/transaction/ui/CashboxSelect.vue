<template>
    <UCarousel 
        v-slot="{ item }" 
        :items="items" 
        arrows 
        class="CashboxSlider" 
        :start-index="index"
        @select="(index) => emits('select', [index])"
        :ui="{viewport: 'CashboxSlider__viewport', item: 'CashboxSlider__item', arrows: 'CashboxSlider__arrows'}"
    >
        <p>{{ item.title }}</p>
    </UCarousel>
</template>

<script setup lang="ts">
const props = defineProps<{
    items: any[],
    index: number
}>();
const emits = defineEmits(['select']);
</script>

<style src="~/assets/css/components/entities/transaction/cashboxSelect.scss"></style>