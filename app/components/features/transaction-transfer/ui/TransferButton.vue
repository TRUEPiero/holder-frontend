<template>
    <div class="Transfer__ActionBlock">
        <Button 
            :label="'Пополнить'" 
            @click.stop="emits('income')" 
        />
        <Button 
            :label="'Перевести'" 
            @click.stop="emits('expense')" 
        />
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue'

const emits = defineEmits(['income', 'expense'])
</script>

<style src="~/assets/css/components/feature/transaction/transfer.scss"></style>